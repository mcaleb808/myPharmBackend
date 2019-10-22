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
    if (!req.body.name || !req.body.location) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }

    const newPharm = req.body;

    try {
      const createPharm = await PharmService.addPharm(newPharm);
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
    if (Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
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

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

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

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const pharmtoDelete = await PharmService.deletePharm(id);

      if (pharmtoDelete) {
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
