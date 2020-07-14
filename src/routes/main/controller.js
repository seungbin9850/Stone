const { User, Stone, Phrase, sequelize, Todo } = require('../../models');

const showMain = async (req, res, next) => {
    const id = req.decoded.id;
    try {
        const user = await User.findOne({
            where: {
                id
            }
        });
        const stone = await Stone.findOne({
            where: {
                userId: id
            }
        });
        const todo = await Todo.findOne({
            where: {
                userId: id
            }
        });
        const phrase = await Phrase.findOne({
            order: sequelize.random()
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
        } else {
            res.status(200).json({
                name: user.name,
                hour: user.hour,
                minute: user.minute,
                level: stone.level,
                growth: stone.growth,
                phrase_name: phrase.name,
                phrase_word: phrase.word,
                todo_what: [],
                message: "성공"
            })
        }
    } catch (err) {
        res.status(404).json({
            message: err.message
        }).end();
    }
}

module.exports = {
    showMain
}