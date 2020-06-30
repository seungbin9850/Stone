const { User } = require('../../models');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const { name, username, password } = req.body;
    try {
        await User.create({ 
            name, 
            username, 
            password
        });
    } catch (err) {
        res.status(409).json({
            message: "이미 있는 유저",
            err: err.message
        });
    }
    res.status(200).json({
        message: "회원가입 성공"
    });
}

const login = async (req, res, next) => {
    const { username, password } = req.body;
    const secret = req.app.get('jwt-secret');
    try {
        const user = await User.findOne({ 
            where: {
                username
            }
        });
        if (user.password === password) {
            const token = await jwt.sign({
                name: user.name,
                username: user.username
            }, secret, {
                expiresIn: '30m'
            });
            res.status(200).json({
                message: "로그인 성공",
                accessToken: token
            })
        } else {
            res.status(409).json({
                message: "틀린 비밀번호"
            });
        }
    } catch (err) {
        res.status(404).json({
            message: "존재하지 않는 유저"
        });
    }
}

module.exports = {
    register,
    login
}