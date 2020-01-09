import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenHandler = user => {
  return jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: 3600 });
};

export default tokenHandler;
