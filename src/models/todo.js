module.exports = (sequelize, DataTypes) => {
    return sequelize.define('todo', {
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
        do: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        check: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        time: {
            type: DataTypes.INTEGER,
        },
        minute: {
            type: DataTypes.INTEGER,
        }
    });
}