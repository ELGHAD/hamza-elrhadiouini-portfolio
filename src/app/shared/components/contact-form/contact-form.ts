import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '../../../core/data/profile.data';
import { EmailService } from '../../../core/services/email.service';
import { LocaleService } from '../../../core/services/locale.service';
import {
  cleanMultiline,
  cleanSingleLine,
  limitedLinks,
  MAX_LINKS,
  noMarkup,
  notBlank,
  personName,
  strictEmail,
} from './contact-input';

type SubmitState = 'idle' | 'sending' | 'success' | 'fallback' | 'error';
type FailureReason = '' | 'invalid' | 'delay' | 'rate-limit' | 'send';

const MINIMUM_FILL_TIME_MS = 2500;
const SESSION_KEY = 'portfolio-contact-sent';
const FIELD_ORDER = ['name', 'email', 'message'] as const;

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent {
  /** Prefix for element ids, so the form can appear on several pages without id clashes. */
  readonly idPrefix = input('contact');
  /** No card of its own: for pages that already frame the form. */
  readonly bare = input(false);

  private readonly formBuilder = inject(FormBuilder);
  private readonly emailService = inject(EmailService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly localeService = inject(LocaleService);
  readonly state = signal<SubmitState>('idle');
  readonly failureReason = signal<FailureReason>('');
  readonly limits = { name: 100, email: 254, message: 5000 } as const;

  readonly form = this.formBuilder.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        notBlank,
        Validators.minLength(2),
        Validators.maxLength(this.limits.name),
        personName,
        noMarkup,
      ],
    ],
    email: [
      '',
      [Validators.required, notBlank, strictEmail, Validators.maxLength(this.limits.email)],
    ],
    message: [
      '',
      [
        Validators.required,
        notBlank,
        Validators.minLength(10),
        Validators.maxLength(this.limits.message),
        noMarkup,
        limitedLinks,
      ],
    ],
    website: [''],
  });

  private formOpenedAt = 0;
  private sentInMemory = false;
  /** Opening line last written by startWith(), replaced while the visitor has not edited it. */
  private lastIntro = '';

  constructor() {
    afterNextRender(() => {
      this.formOpenedAt = Date.now();
    });
  }

  /**
   * Starts the message with an opening line (topic chips on the contact page), then puts
   * the cursor after it. Never overwrites text the visitor typed.
   */
  startWith(intro: string): void {
    const control = this.form.controls.message;
    const current = control.value.trim();
    if (current && current !== this.lastIntro.trim()) {
      this.focusMessage();
      return;
    }
    this.lastIntro = intro;
    control.setValue(intro);
    this.focusMessage();
  }

  private focusMessage(): void {
    const field = this.host.nativeElement.querySelector<HTMLTextAreaElement>('textarea');
    if (!field) return;
    field.focus();
    field.setSelectionRange(field.value.length, field.value.length);
  }

  fieldId(field: string): string {
    return `${this.idPrefix()}-${field}`;
  }

  showError(field: (typeof FIELD_ORDER)[number]): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  /** Built on demand: the form values are not signals, so a computed() would go stale. */
  mailtoHref(): string {
    const { name, email, message } = this.form.getRawValue();
    const french = this.localeService.locale() === 'fr';
    const subject = french ? 'Message depuis mon portfolio' : 'Message from my portfolio';
    const body = `${french ? 'Nom' : 'Name'}: ${name}\n${french ? 'E-mail' : 'Email'}: ${email}\n\n${message}`;
    return `mailto:${PROFILE.email[this.localeService.locale()]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async onSubmit(): Promise<void> {
    this.failureReason.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.fail('invalid');
      this.focusFirstInvalidField();
      return;
    }

    const { website, ...raw } = this.form.getRawValue();
    // Honeypot filled: a bot. Pretend nothing happened and send nothing.
    if (website.trim()) return;

    // What leaves the browser is always the cleaned version (see contact-input.ts).
    const message = {
      name: cleanSingleLine(raw.name),
      email: cleanSingleLine(raw.email).toLowerCase(),
      message: cleanMultiline(raw.message),
    };
    if (message.name.length < 2 || message.message.length < 10) {
      this.fail('invalid');
      return;
    }

    if (Date.now() - this.formOpenedAt < MINIMUM_FILL_TIME_MS) {
      this.fail('delay');
      return;
    }

    if (this.hasSentThisSession()) {
      this.fail('rate-limit');
      return;
    }

    if (!this.emailService.isConfigured()) {
      this.state.set('fallback');
      return;
    }

    this.state.set('sending');
    try {
      await this.emailService.sendMessage(message);
      this.recordSessionSend();
      this.state.set('success');
      this.form.reset({ name: '', email: '', message: '', website: '' });
      this.formOpenedAt = Date.now();
    } catch {
      this.state.set('fallback');
      this.failureReason.set('send');
    }
  }

  /** The message for the first failing rule of a field. */
  fieldError(field: (typeof FIELD_ORDER)[number]): string {
    const errors = this.form.controls[field].errors ?? {};
    const french = this.localeService.locale() === 'fr';
    const t = (fr: string, en: string) => (french ? fr : en);
    if (errors['required'] || errors['blank']) {
      return {
        name: t('Saisissez votre nom.', 'Enter your name.'),
        email: t('Saisissez votre adresse e-mail.', 'Enter your email address.'),
        message: t('Écrivez votre message.', 'Write your message.'),
      }[field];
    }
    if (errors['markup']) {
      return t(
        'Le HTML et les liens « javascript: » ne sont pas acceptés.',
        'HTML and “javascript:” links are not accepted.',
      );
    }
    if (errors['links']) {
      return t(
        `${MAX_LINKS} liens maximum par message.`,
        `At most ${MAX_LINKS} links per message.`,
      );
    }
    if (field === 'name') {
      return errors['name']
        ? t(
            'Lettres, espaces, apostrophes, points et tirets uniquement.',
            'Letters, spaces, apostrophes, dots and hyphens only.',
          )
        : t('Entre 2 et 100 caractères.', 'Between 2 and 100 characters.');
    }
    if (field === 'email') {
      return t('Saisissez une adresse e-mail valide (ex. nom@domaine.com).', 'Enter a valid email address (e.g. name@domain.com).');
    }
    return t(
      'Le message doit contenir entre 10 et 5 000 caractères.',
      'The message must be between 10 and 5,000 characters.',
    );
  }

  errorMessage(): string {
    const french = this.localeService.locale() === 'fr';
    switch (this.failureReason()) {
      case 'delay':
        return french
          ? 'Patientez quelques secondes avant l’envoi.'
          : 'Please wait a few seconds before sending.';
      case 'rate-limit':
        return french
          ? 'Un message a déjà été envoyé depuis cette session. Écrivez-moi directement par e-mail si besoin.'
          : 'A message has already been sent in this session. Email me directly if you need to.';
      default:
        return french
          ? 'Vérifiez les champs signalés du formulaire.'
          : 'Please check the highlighted form fields.';
    }
  }

  private fail(reason: FailureReason): void {
    this.state.set('error');
    this.failureReason.set(reason);
  }

  private focusFirstInvalidField(): void {
    const field = FIELD_ORDER.find((name) => this.form.controls[name].invalid);
    if (!field) return;
    this.host.nativeElement.querySelector<HTMLElement>(`#${this.fieldId(field)}`)?.focus();
  }

  private hasSentThisSession(): boolean {
    if (this.sentInMemory) return true;
    if (!isPlatformBrowser(this.platformId)) return false;
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  }

  private recordSessionSend(): void {
    this.sentInMemory = true;
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // Storage blocked (private mode): the in-memory flag still limits this page view.
    }
  }
}
