import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Input hardening for the contact form. There is no database behind the form (EmailJS sends
 * the message), so SQL injection does not apply; the risks are header injection through line
 * breaks, HTML injected into the email, invisible or control characters, and link spam.
 * Validators reject bad input with a clear message; cleaners normalise what is finally sent.
 */

// C0 controls except tab, line feed and carriage return, plus DEL.
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
// Zero-width characters and bidirectional overrides, which can disguise text.
const INVISIBLE_CHARACTERS = /[​-‏‪-‮⁠-⁤﻿]/g;
const HTML_TAG = /<\s*\/?\s*[a-z!][^>]*>/i;
const SCRIPT_URL = /\b(?:javascript|vbscript|data)\s*:/i;
const LINK = /\b(?:https?:\/\/|www\.)\S+/gi;

/** Letters (any alphabet), spaces, apostrophes, dots and hyphens. */
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} '’.-]*$/u;
/** One @, no spaces or special characters, and a domain with a real extension. */
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

export const MAX_LINKS = 3;

/** One line: no line breaks (blocks header injection), no hidden characters, single spaces. */
export function cleanSingleLine(value: string): string {
  return value
    .normalize('NFC')
    .replace(CONTROL_CHARACTERS, '')
    .replace(INVISIBLE_CHARACTERS, '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/ {2,}/g, ' ')
    .trim();
}

/** Free text: line breaks kept and normalised, hidden characters removed, blank runs capped. */
export function cleanMultiline(value: string): string {
  return value
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(CONTROL_CHARACTERS, '')
    .replace(INVISIBLE_CHARACTERS, '')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

/** `required` accepts "   "; this does not. */
export const notBlank: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  String(control.value ?? '').trim() ? null : { blank: true };

export const personName: ValidatorFn = (control) => {
  const value = cleanSingleLine(String(control.value ?? ''));
  return !value || NAME_PATTERN.test(value) ? null : { name: true };
};

export const strictEmail: ValidatorFn = (control) => {
  const value = String(control.value ?? '').trim();
  return !value || (EMAIL_PATTERN.test(value) && !/[\r\n]/.test(value)) ? null : { email: true };
};

/** No HTML tags or script URLs: the email stays plain text. */
export const noMarkup: ValidatorFn = (control) => {
  const value = String(control.value ?? '');
  return HTML_TAG.test(value) || SCRIPT_URL.test(value) ? { markup: true } : null;
};

export const limitedLinks: ValidatorFn = (control) => {
  const links = String(control.value ?? '').match(LINK)?.length ?? 0;
  return links > MAX_LINKS ? { links: true } : null;
};
