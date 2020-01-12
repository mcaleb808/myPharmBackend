import mailer from 'nodemailer';

const defaults = {
  subject: 'Hello Pacific',
  text: 'Hope this email finds you well.',
  html: '<b>I have good news for you ma bro</b>' // html body
};

export default class Helpers {
  static async sendEmail(recipients = [] || '', options = defaults) {
    const testAccount = await mailer.createTestAccount();
    const transporter = mailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      },
      tls: { rejectUnauthorized: false }
    });

    return transporter.sendMail({
      from: testAccount.user,
      to: typeof recipients === 'object' && recipients.length
        ? recipients.join(', ')
        : recipients,
      ...options
    });
  }
}
