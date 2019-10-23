import { Pharmacie } from '../src/models';

export default class PharmService {
  static async getAllPharms() {
    try {
      return await Pharmacie.findAll();
    } catch (err) {
      throw err;
    }
  }

  static async addPharm(newPharm) {
    try {
      return await Pharmacie.create(newPharm);
    } catch (err) {
      throw err;
    }
  }

  static async updatePharm(id, updatePharm) {
    try {
      const pharmToUpdate = await Pharmacie.findOne({
        where: {
          id: id
        }
      });

      if (pharmToUpdate) {
        await Pharmacie.update(updatePharm, {
          where: {
            id: id
          }
        });
      }
    } catch (err) {
      throw err;
    }
  }

  static async getAPharm(id) {
    try {
      const thePharm = await Pharmacie.findOne({
        where: {
          id: id
        }
      });
      return thePharm;
    } catch (err) {
      throw err;
    }
  }

  static async deletePharm(id) {
    try {
      const pharmToDelete = await Pharmacie.findOne({
        where: {
          id: id
        }
      });

      if (pharmToDelete) {
        await Pharmacie.destroy({
          where: {
            id: id
          }
        });
        return pharmToDelete;
      }
    } catch (err) {
      throw err;
    }
  }
}
