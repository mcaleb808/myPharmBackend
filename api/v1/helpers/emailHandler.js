import mailer from 'nodemailer';

const mailBody = (email, firstName, password) => {
  return `
<div style= "flex: 1; font-family: roboto bold; text-align: center; justify-content: center; width: 80%; margin: auto; margin-top: 30px; padding: auto;">
  <div>
    <img
      alt="Image"
      src="https://res.cloudinary.com/ddsybt1qk/image/upload/v1579004982/665aac2e-cdfd-4768-b1a6-6c8bbd1d36bd_200x200_1_1_jjbc0a.png"
      title="Image"
      width="162"
    />
  </div>
    <p style="font-size: 42px; color: #1dd1a1; font-weight: 600;">
      Hello ${firstName},
    </p>
    <p style="font-size: 22px; color: #222f3e;">
      We are pleased to inform that your registration in PharmaLoc is
      successfully approved.
    </p>

    <div style="font-size: 16px; font-weight: 500;">
      <p style="color: #1dd1a1; padding-right: 10px;">Email:</p>
      <p style="color: #222f3e;">${email}</p>
    </div>
    <div style="font-size: 16px; font-weight: 500;">
      <p style="color: #1dd1a1; padding-right: 10px;">Password:</p>
      <p style="color: #222f3e;">${password}</p>
    </div>
  <footer style="background-color: #222f3e; height: 50px; margin-top: 70px; align-items: center; color: #ffffff; font-size: 16px; text-align: center;">
    <p style="padding:1.5%;">PharmaLoc 2019 © all rights reserved</p>
  </footer>
</div>
`;
};

const { SMTP_USER, SMTP_PASSWORD } = process.env;

export default class Emails {
  static async sendEmail(recipients = [] || '', firstName, password) {
    const options = {
      from: '',
      subject: 'PharmLoc account notification.',
      html: mailBody(recipients, firstName, password)
    };
    const transporter = mailer.createTransport({
      service: 'gmail',
      port: 587,
      tls: { rejectUnauthorized: false },
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD }
    });
    const mailOptions = {
      ...options,
      from: SMTP_USER,
      to: typeof recipients === 'object' && recipients.length ? recipients.join(', ') : recipients
    };
    return transporter.sendMail(mailOptions);
  }
}
