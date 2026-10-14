import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EmailService } from '../../../core/services/email.service';
import { ContactFormComponent } from './contact-form';

describe('ContactFormComponent', () => {
  const emailService = {
    isConfigured: vi.fn(() => true),
    sendMessage: vi.fn(async () => undefined),
  };

  async function setup() {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [provideRouter([]), { provide: EmailService, useValue: emailService }],
    }).compileComponents();
    const fixture = TestBed.createComponent(ContactFormComponent);
    await fixture.whenStable();
    return { fixture, component: fixture.componentInstance };
  }

  function fillValidForm(component: ContactFormComponent): void {
    component.form.setValue({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Bonjour, parlons d’un projet Spring Boot.',
      website: '',
    });
  }

  beforeEach(() => {
    emailService.isConfigured.mockReturnValue(true);
    emailService.sendMessage.mockClear();
    try {
      sessionStorage.clear();
    } catch {
      // Storage unavailable in this environment.
    }
  });

  afterEach(() => vi.restoreAllMocks());

  it('rejects an invalid form and does not send', async () => {
    const { component } = await setup();
    await component.onSubmit();
    expect(component.state()).toBe('error');
    expect(component.failureReason()).toBe('invalid');
    expect(emailService.sendMessage).not.toHaveBeenCalled();
  });

  it('silently drops submissions with a filled honeypot', async () => {
    const { component } = await setup();
    fillValidForm(component);
    component.form.controls.website.setValue('https://spam.example');
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 10_000);
    await component.onSubmit();
    expect(emailService.sendMessage).not.toHaveBeenCalled();
    expect(component.state()).toBe('idle');
  });

  it('refuses submissions sent faster than a human could type', async () => {
    const { component } = await setup();
    fillValidForm(component);
    await component.onSubmit();
    expect(component.failureReason()).toBe('delay');
    expect(emailService.sendMessage).not.toHaveBeenCalled();
  });

  it('sends once, then limits further messages in the same session', async () => {
    const { component } = await setup();
    const later = Date.now() + 10_000;
    vi.spyOn(Date, 'now').mockReturnValue(later);
    fillValidForm(component);
    await component.onSubmit();
    expect(emailService.sendMessage).toHaveBeenCalledTimes(1);
    expect(component.state()).toBe('success');

    fillValidForm(component);
    vi.spyOn(Date, 'now').mockReturnValue(later + 10_000);
    await component.onSubmit();
    expect(component.failureReason()).toBe('rate-limit');
    expect(emailService.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('falls back to a prefilled mailto link when EmailJS is not configured', async () => {
    emailService.isConfigured.mockReturnValue(false);
    const { component } = await setup();
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 10_000);
    fillValidForm(component);
    await component.onSubmit();
    expect(component.state()).toBe('fallback');
    expect(component.mailtoHref()).toContain('mailto:hamelrhadiouini@gmail.com');
    expect(component.mailtoHref()).toContain(encodeURIComponent('Ada Lovelace'));
  });

  it('falls back to mailto when delivery fails', async () => {
    emailService.sendMessage.mockRejectedValueOnce(new Error('network'));
    const { component } = await setup();
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 10_000);
    fillValidForm(component);
    await component.onSubmit();
    expect(component.state()).toBe('fallback');
    expect(component.failureReason()).toBe('send');
  });

  it('rejects HTML, script links, blank fields and link spam', async () => {
    const { component } = await setup();
    const { name, message } = component.form.controls;

    name.setValue('<b>Ada</b>');
    expect(name.hasError('markup')).toBe(true);
    name.setValue('Ada 123');
    expect(name.hasError('name')).toBe(true);
    message.setValue('          ');
    expect(message.hasError('blank')).toBe(true);
    message.setValue('Click here: javascript:alert(1) please');
    expect(message.hasError('markup')).toBe(true);
    message.setValue('Links: https://a.io https://b.io https://c.io https://d.io');
    expect(message.hasError('links')).toBe(true);
    component.form.controls.email.setValue('ada@localhost');
    expect(component.form.controls.email.hasError('email')).toBe(true);
  });

  it('sends cleaned values: no hidden characters, single-line name, trimmed message', async () => {
    const { component } = await setup();
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 10_000);
    component.form.setValue({
      name: '  Ada\u200B   Lovelace ',
      email: ' Ada@Example.com ',
      message: '\u0007Bonjour,\r\n\r\n\r\n\r\n\r\nparlons d’un projet.  ',
      website: '',
    });
    await component.onSubmit();
    expect(emailService.sendMessage).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Bonjour,\n\n\nparlons d’un projet.',
    });
  });
});
