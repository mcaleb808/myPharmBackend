import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user';
import util from '../utils/utils';

dotenv.config();

const tokenValidator = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    util.setError(401, 'No token provided.');
    return util.send(res);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const query = await User.findOne({ where: { id: decoded.userId } });
    if (query['0']) {
      util.setError(403, 'the user who belong to this token does not exist.');
      return util.send(res);
    }
    req.userId = query['0'].userId;
    return next;
  } catch (err) {
    if (err.message === 'jwt malformed') {
      util.setError(400, 'your token is invalid.');
      return util.send(res);
    }
    util.setError(500, err);
    return util.send(res);
  }
};

export default tokenValidator;
