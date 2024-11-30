
export function saveUser(req, res, next) {
    res.locals.user = req.session.user || null;
    next();
}
