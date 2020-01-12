import mailer from 'nodemailer';

const defaults = {
  from: '',
  subject: 'PharmLoc account notification.',
  text: 'Hello, your pharmacy membership request was reviewed and approved.',
  html: ''
};
const { SMTP_USER, SMTP_PASSWORD } = process.env;

export default class Helpers {
  static async sendEmail(recipients = [] || '', options = defaults) {
    const transporter = mailer.createTransport({
      service: 'gmail',
      port: 587,
      tls: { rejectUnauthorized: false },
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD }
    });
    const mailOptions = {
      ...options,
      from: SMTP_USER,
      to: typeof recipients === 'object' && recipients.length
        ? recipients.join(', ')
        : recipients,
    };
    return transporter.sendMail(mailOptions);
  }
}
