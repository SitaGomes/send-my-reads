import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMailWithAttachment(
    to: string,
    subject: string,
    text: string,
    attachmentPath: string,
  ) {
    try {
      console.log(
        process.env.EMAIL_SERVICE,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD,
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        attachments: [
          {
            filename: 'attachment.epub',
            path: attachmentPath,
          },
        ],
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default EmailService;
