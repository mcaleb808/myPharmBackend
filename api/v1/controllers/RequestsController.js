// import mailer from 'nodemailer';
import models from '../models';
// import utils from '../utils/utils';

const { Pharmacy } = models;

class MembershipController {
  static async confirm({ params }, res) {
    // DONE: Check if the specific request exists
    // ONGOING: Check if the specific request exists
    // TODO: Update its status to approved
    // TODO: Auto generate the password for the user
    // TODO: Migrate the user from pharmacy model to create a new user
    // TODO: Send the user confirmation email
    // FIXME: Enable the skipped test suite cases to run

    const [updated] = await Pharmacy.scope('pending')
      .update({ status: 'approved' }, { where: { id: params.id }, });
    if (!updated) {
      return res.status(404).json({ message: "We don't have such membership request" });
    }
    // const [pharmacy] = pharmacies;
    // const { email } = pharmacy;
    // utils.setSuccess(200, 'The request confirmaconstn successful', pharmacy);
    // const transport = mailer.createTransport({
    //   host: 'smtp.mailtrap.io',
    //   port: 2525,
    //   auth: {
    //     user: 'put_your_username_here',
    //     pass: 'put_your_password_here'
    //   }
    // });
  }
}

export default MembershipController;
