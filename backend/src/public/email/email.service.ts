import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ERROR_STATUS } from 'src/lib/constants/STATUS';
import { throwErrorFactory } from 'src/lib/error/errorFactory';

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
    attachmentName: string,
    attachment: Buffer,
  ) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        attachments: [
          {
            filename: attachmentName,
            content: attachment,
          },
        ],
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throwErrorFactory(
        'Error sending email',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default EmailService;
