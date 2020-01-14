import PharmService from '../services/PharmService';
import util from '../utils/utils';
import getAllHelper from '../helpers/getAllHelper';
import updateHelper from '../helpers/updateHelper';

class PharmController {
  static async getAllPharms(_req, res) {
    const query = PharmService.getAllPharms();
    getAllHelper(query, res, util, 'Pharmacies retrieved', 'No pharmacy found');
  }

  static async getAllRequests(_req, res) {
    const query = PharmService.getAllRequests();
    getAllHelper(query, res, util, 'Requests retrieved', 'No request found');
  }

  static async addPharm(req, res) {
    const newPharm = req.body;
    const insurances = [...new Set(newPharm.insurances)];
    try {
      const createPharm = await PharmService.addPharm({
        name: newPharm.name,
        logo: newPharm.logo,
        email: newPharm.email,
        telephone: newPharm.telephone,
        insurances,
        pharmRep: newPharm.pharmRep
      });
      util.setSuccess(201, 'Pharm Added', createPharm);
      return util.send(res);
    } catch (err) {
      util.setError(400, err.message);
      return util.send(res);
    }
  }

  static async updatePharm(req, res) {
    const updatedPharm = req.body;
    const { id } = req.params;
    const error = `Cannot find a Pharmacy with the id ${id}`;
    const message = 'Pharmacy updated';

    await updateHelper(id, res, updatedPharm, PharmService, util, message, error);
  }

  static async rejectRequest(req, res) {
    const status = 'rejected';
    const { id } = req.params;
    const error = `Cannot find a Request with the id ${id}`;
    const message = 'Request rejected';

    await updateHelper(id, res, { status }, PharmService, util, message, error);
  }

  static async getAPharm(req, res) {
    const { id } = req.params;

    try {
      const thePharm = await PharmService.getAPharm(id);

      if (!thePharm) {
        util.setError(404, `Cannot find Pharmacy with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Pharmacy', thePharm);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deletePharm(req, res) {
    const { id } = req.params;

    try {
      const pharmToDelete = await PharmService.deletePharm(id);

      if (pharmToDelete) {
        util.setSuccess(200, 'Pharmacy deleted');
      } else {
        util.setError(404, `Pharmacy with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default PharmController;
