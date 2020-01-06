import roles from '../helpers/roles';
import util from '../utils/utils';

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        util.setError(401, "You don't have enough permission to perform this action");
        return util.send(res);
      }
      next();
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  };
};

export default grantAccess;
