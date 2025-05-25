import createHttpError from 'http-errors';
/**
 * Permit only certain roles to access a route.
 * @param allowedRoles list of roles, e.g. ['super-admin', 'branch-admin']
 */
export const permit = (...allowedRoles) => (req, _res, next) => {
    const user = req.user;
    if (!user) {
        return next(new createHttpError.Unauthorized('No user authenticated'));
    }
    if (!allowedRoles.includes(user.role)) {
        return next(new createHttpError.Forbidden(`User role '${user.role}' not authorized for this action`));
    }
    next();
};
