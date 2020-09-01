const { Diary } = require("../../models");

const write = async (req, res, next) => {
  const { year, month, day, content } = req.body;
  const userId = req.decoded.id;
  try {
    await Diary.create({
      year,
      month,
      day,
      content,
      userId,
    });
    res.status(200).json({
      message: "성공",
    });
  } catch (err) {
    res.status(500).json({
      message: "실패",
    });
  }
};

module.exports = {
  write,
};
