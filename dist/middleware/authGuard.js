import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
export const authGuard = (req, _res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            // now an unexpected server error instead of import-time crash
            throw new createHttpError.InternalServerError('JWT_SECRET not configured');
        }
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new createHttpError.Unauthorized('Authorization header missing or malformed');
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { userId: payload.userId, role: payload.role };
        next();
    }
    catch (err) {
        next(err);
    }
};
