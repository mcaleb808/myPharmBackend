import PharmValidator from '../helpers/pharmValidator';
import util from '../utils/utils';
import errorToString from '../helpers/formatError';

export default class PharmValidators {
  static request(req, res, next) {
    const { error } = PharmValidator.request(req.body);
    if (error) {
      const newMessage = errorToString(error);
      util.setError(400, newMessage);
      return util.send(res);
    }
    return next();
  }
}
