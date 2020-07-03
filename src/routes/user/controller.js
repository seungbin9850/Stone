const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const register = async (req, res, next) => {
    const { name, username, password } = req.body;
    const secret = req.app.get('crypto-secret');
    const cipher = crypto.createCipher('aes-256-cbc', secret);
    let result = cipher.update(password, 'utf8', 'base64');
    result += cipher.final('base64');
    try {
        await User.create({ 
            name, 
            username, 
            password: result
        });
    } catch (err) {
        res.status(409).json({
            message: "이미 있는 유저",
            err: err.message
        });
    }
    res.status(200).json({
        message: "회원가입 성공",
    });
}

const login = async (req, res, next) => {
    const { username, password } = req.body;
    const cryptoSecret = req.app.get('crypto-secret');
    const decipher = crypto.createDecipher('aes-256-cbc', cryptoSecret);
    const secret = req.app.get('jwt-secret');
    const refreshSecret = req.app.get('refresh-secret');
    try {
        const user = await User.findOne({ 
            where: {
                username
            }
        });
        let result = decipher.update(user.password, 'base64', 'utf8');
        result += decipher.final('utf8');
        if (result === password) {
            const accessToken = await jwt.sign({
                name: user.name,
                username: user.username
            }, secret, {
                expiresIn: '30m'
            });
            const refreshToken = await jwt.sign({
                name: user.name,
                username: user.username,
            }, refreshSecret, {
                expiresIn: '1w'
            });
            await user.update({
                refresh: refreshToken,
                first: false,
                where: {
                    username
                }
            });
            res.status(200).json({
                message: "로그인 성공",
                accessToken,
                refreshToken,
                first: user.first
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

const refresh = async (req, res, next) => {
    const refresh = req.headers['refresh_token'];
    const secret = req.app.get('jwt-secret');
    try {
        const user = await User.findOne({
            where: {
                refresh
            }
        });
        const accessToken = await jwt.sign({
            name: user.name,
            username: user.username
        }, secret, {
            expiresIn: '30m'
        });
        res.status(200).json({
            message: "재발급 성공",
            accessToken
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    register,
    login,
    refresh
}