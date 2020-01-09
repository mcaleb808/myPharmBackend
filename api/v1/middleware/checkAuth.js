import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models';
import util from '../utils/utils';

dotenv.config();

export default async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    util.setError(401, 'No token provided.');
    return util.send(res);
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const query = await User.findOne({ where: { id: decoded.userId } });
  if (!query) {
    util.setError(401, 'Invalid credentials provided');
    return util.send(res);
  }
  req.user = query;
  return next();
};
