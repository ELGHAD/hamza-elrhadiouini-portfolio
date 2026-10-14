import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  isConfigured(): boolean {
    const { serviceId, templateId, publicKey } = environment.emailjs;
    return Boolean(serviceId && templateId && publicKey);
  }

  async sendMessage(data: ContactFormData): Promise<void> {
    const { serviceId, templateId, publicKey } = environment.emailjs;
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS is not configured for this deployment.');
    }

    // Loaded on submit only, so the SDK never weighs on the initial page load.
    const { default: emailjs } = await import('@emailjs/browser');
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: data.name,
        email: data.email,
        message: data.message,
      },
      {
        publicKey,
        blockHeadless: true,
        limitRate: { id: 'portfolio-contact', throttle: 60_000 },
      },
    );
  }
}
