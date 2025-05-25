/**
 * Wraps an async controller so errors are caught and passed to next().
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
