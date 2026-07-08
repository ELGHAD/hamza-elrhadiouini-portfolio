import { Injectable } from '@angular/core';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  // EmailJS integration will be wired here once you create your EmailJS account
  async sendMessage(data: ContactFormData): Promise<void> {
    console.log('Sending message (placeholder):', data);
    // Real implementation added in Contact step
  }
}