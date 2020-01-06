import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import { User } from '../models';
import util from '../utils/utils';
import tokenHandler from '../helpers/tokenHandler';

class AuthController {
  static async signup(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const userId = uuidv4();
    try {
      const newAdmin = await User.create({
        id: userId,
        firstName,
        lastName,
        email,
        password,
        role: 'admin'
      });
      const token = tokenHandler(newAdmin);
      newAdmin.password = undefined;
      util.setSuccess(201, 'admin created successfully', { token, admin: newAdmin });
      return util.send(res);
    } catch (err) {
      if (err.message.startsWith('duplicate key')) {
        util.setError(409, 'email already taken');
        return util.send(res);
      }
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const checkUser = await User.findOne({ where: { email } });
      if (!checkUser) {
        util.setError(401, "'incorrect email or password'");
        return util.send(res);
      }
      if (!(await bcrypt.compare(password.trim(), checkUser.password, checkUser.salt))) {
        util.setError(401, 'incorrect email or password');
        return util.send(res);
      }
      const token = tokenHandler(checkUser);
      checkUser.password = undefined;
      util.setSuccess(200, 'Admin successfully logged in', { token, user: checkUser });
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }
}

export default AuthController;
