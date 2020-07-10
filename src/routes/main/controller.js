const { User, Stone, Phrase, sequelize, Todo } = require('../../models');

const showMain = async (req, res, next) => {
    const id = req.decoded.id;
    try {
        const phrase = await Phrase.findOne({
            order: sequelize.random()
        });
        const user = await User.findOne({
            id
        });
        const stone = await Stone.findOne({
            userId: id
        });
        const todo = await Todo.findOne({
            userId: id
        });
        if (todo) {
            res.status(200).json({
                name: user.name,
                hour: user.hour,
                minute: user.minute,
                level: stone.level,
                growth: stone.growth,
                phrase_name: phrase.name,
                phrase_word: phrase.word,
                todo_what: todo.what.split('^-;%&'),
                message: "성공"
            })
        }
        res.status(200).json({
            name: user.name,
            hour: user.hour,
            minute: user.minute,
            level: stone.level,
            growth: stone.growth,
            phrase_name: phrase.name,
            phrase_word: phrase.word,
            message: "성공"
        })
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

module.exports = {
    showMain
}