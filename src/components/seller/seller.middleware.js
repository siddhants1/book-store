const idCheckMiddleware = async (req, res, next) => {
    if (Number(req.user?.id) !== Number(req.params?.id)) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    next();
}

module.exports = {
    idCheckMiddleware
};