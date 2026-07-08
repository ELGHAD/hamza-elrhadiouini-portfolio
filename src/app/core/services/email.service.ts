import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly serviceId = 'service_r7onrxq';
  private readonly templateId = 'template_g5igah6';
  private readonly publicKey = 'pOu0FlhvGBN4cJMBa';

  async sendMessage(data: ContactFormData): Promise<void> {
    await emailjs.send(
      this.serviceId,
      this.templateId,
      {
        name: data.name,
        email: data.email,
        message: data.message
      },
      this.publicKey
    );
  }
}