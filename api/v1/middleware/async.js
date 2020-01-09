/**
 * @description This function wraps each request pipeline's middleware
 * inside a [try{}catch(){}] block
 * @author MUSIGWA Pacifique
 * @param  {function} handler The middleware function to be wrapped
 */
export default (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    let error = new Error(err.message || 'Internal server error');
    error.status = 500;
    if (err && err.details) {
      ([error] = err.details);
      error.status = 400;
    }
    if (err.message.includes('jwt malformed')) {
      return res.status(400).json({ message: 'your token is invalid.' });
    }
    return res.status(error.status).json({ message: error.message, ...error });
  }
};
