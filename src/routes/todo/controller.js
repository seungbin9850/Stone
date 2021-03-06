const { Todo, Stone, Check } = require('../../models');

const setTodo = async(req, res, next) => {
    const what = req.body.what.join('^-;%&');
    const userId = req.decoded.id;
    try {
        const todo = await Todo.findOne({
            where: {
                userId
            }
        })
        if (!todo.what) {
            await todo.update({
                what,
            });
            res.status(200).json({
                message: "성공",
            })
        } else {
            res.status(471).json({
                message: "이미 목표를 정함"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "실패"
        })
    }
}

const success = async (req, res, next) => {
    const { year, month, day } = req.body;
    const userId = req.decoded.id;
    try {
        await Todo.destroy({
            where: {
                userId
            }
        })
        const stone = await Stone.findOne({
            where: {
                userId
            }
        })
        stone.growth += 100 * (5 / stone.left);
        if (stone.growth >= 100) {
            stone.growth -= 100;
            stone.level += 1;
        }
        stone.save();
        await Check.create({
            year,
            month,
            day,
            userId,
            check: true
        });
        await Todo.create({
            userId
        })
        res.status(200).json({
            message: "성공"
        })
    } catch (err) {
        res.status(472).json({
            message: err.message
        })
    }
}

const fail = async (req, res, next) => {
    const userId = req.decoded.id;
    try {
        await Todo.destroy({
            where: {
                userId
            }
        })
        await Check.create({
            year,
            month,
            day,
            userId,
            check: false
        })
        await Todo.create({
            userId
        })
        res.status(200).json({
            message: "성공"
        })
    } catch (err) {
        res.status(472).json({
            message: err.message
        })
    }
}

module.exports = {
    setTodo,
    success,
    fail
}