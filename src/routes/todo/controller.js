const { Todo, Stone } = require('../../models');

const setTodo = async(req, res, next) => {
    const what = req.body.what.join('^-;%&');
    const userId = req.decoded.id;
    try {
        await Todo.create({
            what,
            userId
        });
    } catch (err) {
        res.status(500).json({
            message: "실패"
        })
    }
    res.status(200).json({
        message: "성공"
    })
}

module.exports = {
    setTodo
}