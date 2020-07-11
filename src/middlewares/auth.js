const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['access_token'];
    if (!token) {
        res.status(403).json({
            message: "로그인 되어있지 않음"
        }).end();
    }
    try {
        await jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if (err) throw new Error(err.message);
            req.decoded = decoded;
            next();
        })
    } catch (err) {
        res.status(403).json({
            message: err.message
        }).end();
    }
}

module.exports = authMiddleware;