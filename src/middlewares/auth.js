const jwt = require('jwt');

module.exports = (req, res, next) => {
    const token = req.headers[access_token];
    const secret = req.app.get('jwt-secret');
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) throw new Error(err);
            req.decoded = decoded;
            next();
        });
    } else {
        res.status(403).json({
            message: "로그인 되어있지 않음"
        })
    }
}