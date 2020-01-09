import { Pharmacy } from '../models';

export default class PharmService {
  static async getAllPharms() {
    try {
      return await Pharmacy.findAll();
    } catch (err) {
      throw err;
    }
  }

  static async getAllRequests() {
    try {
      return await Pharmacy.findAll({ where: { status: 'pending' } });
    } catch (err) {
      throw err;
    }
  }

  static async addPharm(newPharm) {
    try {
      return await Pharmacy.create(newPharm);
    } catch (err) {
      throw err;
    }
  }

  static async updatePharm(id, updatePharm) {
    try {
      const pharmToUpdate = await Pharmacy.findOne({
        where: {
          id
        }
      });
      if (pharmToUpdate) {
        await pharmToUpdate.update(updatePharm, {
          where: {
            id
          }
        });
      }
      return pharmToUpdate;
    } catch (err) {
      throw err;
    }
  }

  static async getAPharm(id) {
    try {
      const thePharm = await Pharmacy.findOne({
        where: {
          id
        }
      });
      return thePharm;
    } catch (err) {
      throw err;
    }
  }

  static async deletePharm(id) {
    try {
      const pharmToDelete = await Pharmacy.findOne({
        where: {
          id
        }
      });

      if (pharmToDelete) {
        await Pharmacy.destroy({
          where: {
            id
          }
        });
        return pharmToDelete;
      }
    } catch (err) {
      throw err;
    }
  }
}
