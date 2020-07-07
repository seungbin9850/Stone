module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stone', {
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        growth: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        left: {
            type: DataTypes.INTEGER,
        }
    });
}