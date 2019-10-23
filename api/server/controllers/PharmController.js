import PharmService from '../services/PharmService';
import Util from '../utils/utils';

const util = new Util();

class PharmController {
  static async getAllPharms(req, res) {
    try {
      const allPharms = await PharmService.getAllPharms();
      if (allPharms.length > 0) {
        util.setSuccess(200, 'Pharmacies retrieved', allPharms);
      } else {
        util.setSuccess(200, 'No pharmacy found');
      }
      return util.send(res);
    } catch (err) {
      util.setError(400, err);
      return util.send(res);
    }
  }

  static async addPharm(req, res) {
    if (!req.body.name || !req.body.logo) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }

    const newPharm = req.body;

    const insurances = [...new Set(newPharm.insurance)];

    try {
      const createPharm = await PharmService.addPharm({
        name: newPharm.name,
        logo: newPharm.logo,
        insurance: insurances
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

    try {
      const updatePharm = await PharmService.updatePharm(id, updatedPharm);
      if (!updatedPharm) {
        util.setError(404, `Cannot find a Pharmacy with the id ${id}`);
      } else {
        util.setSuccess(200, 'Pharmacy updated', updatePharm);
      }
      return util.send(res);
    } catch (err) {
      util.setError(404, err);
      return util.send(res);
    }
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
