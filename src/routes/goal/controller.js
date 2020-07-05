const { Goal } = require('../../models');

const setGoal = async (req, res, next) => {
    const userId = req.decoded.id;
    const { year, month, day, what } = req.body;
    try {
        await Goal.create({
            userId,
            year,
            month,
            day,
            what
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
    res.status(200).json({
        message: "success"
    })
}

module.exports = {
    setGoal
}