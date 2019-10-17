import { Pharmacie } from '../src/models';

export default class PharmService {
  static async getAllPharms() {
    try {
      return await database.Pharmacie.findAll();
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
      const pharmToUpdate = await database.Pharmacie.findOne({
        where: {
          id: Number(id)
        }
      });

      if (pharmToUpdate) {
        await database.Pharmacie.update(updatePharm, {
          where: {
            id: Number(id)
          }
        });
      }
    } catch (err) {
      throw err;
    }
  }

  static async getAPharm(id) {
    try {
      const thePharm = await database.Pharmacie.findOne({
        where: {
          id: Number(id)
        }
      });
      return thePharm;
    } catch (err) {
      throw err;
    }
  }

  static async deletePharm(id) {
    try {
      const pharmToDelete = await database.Pharmacie.findOne({
        where: {
          id: Number(id)
        }
      });

      if (pharmToDelete) {
        await database.Pharmacie.destroy({
          where: {
            id: Number(id)
          }
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
