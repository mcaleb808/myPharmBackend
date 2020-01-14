import { generate } from 'generate-password';
import models from '../models';
import utils from '../utils/utils';
import Emails from '../helpers/emailHandler';

const { Pharmacy, User } = models;

class MembershipController {
  /**
   * @description This approves the membership request
   * @author MUSIGWA Pacifique
   * @static
   * @param  {any} { params } The request parameters to get the request ID
   * @param  {any} res The HTTP response object to be sent to the requester
   * @return The HTTP response object to be sent to the requester
   * @memberof MembershipController
   */
  static async confirm({ params }, res) {
    const [updated, pharmacies] = await Pharmacy.scope('pending').update(
      { status: 'approved' },
      { where: { id: params.id } }
    );
    if (!updated) {
      return res.status(404).json({ message: "We don't have such membership request" });
    }
    const pharmacy = pharmacies[0].get();
    const { pharmRep, email } = pharmacy;
    const [firstName, lastName] = pharmRep.split(' ');
    const password = generate({ numbers: true, length: 12 });
    const user = await User.create({ firstName, lastName, email, password });
    await Pharmacy.update({ repId: user.id }, { where: { id: pharmacy.id } });
    await Emails.sendEmail(email);
    utils.setSuccess(200, 'The request confirmation successful', { pharmacy });
    return utils.send(res);
  }
}

export default MembershipController;
