module.exports = (sequelize, DataTypes) => {
    return sequelize.define('check', {
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        check: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });
}