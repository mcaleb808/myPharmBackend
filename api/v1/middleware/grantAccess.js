import roles from '../helpers/roles';
import util from '../utils/utils';

/**
 * @description This checks for access level and rejects the request or pass control
 * to the next middleware function
 * @author Caleb
 * @param  {string} [action='readAny'] An intended action the user wants to perform
 * @param  {string} [resource='profile'] The resource the user attempts to access
 * @return {function} This is the request middleware function
 */
export default (action, resource) => {
  return async (req, res, next) => {
    const permission = roles.can(req.user.role)[action](resource);
    if (!permission.granted) {
      util.setError(403, "You don't have permission to perform this action");
      return util.send(res);
    }
    return next();
  };
};
