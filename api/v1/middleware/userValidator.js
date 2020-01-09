import UserValidator from '../helpers/userValidator';
import util from '../utils/utils';
import errorToString from '../helpers/formatError';

export default class UserValidators {
  static signup(req, res, next) {
    const { error } = UserValidator.signup(req.body);
    if (error) {
      const newMessage = errorToString(error);
      util.setError(404, newMessage);
      return util.send(res);
    }
    return next();
  }

  static login(req, res, next) {
    const { error } = UserValidator.login(req.body);
    if (error) {
      const newMessage = errorToString(error);
      util.setError(404, newMessage);
      return util.send(res);
    }
    return next();
  }
}
