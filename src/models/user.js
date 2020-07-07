module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
        },
        username: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        first: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        auto: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        refresh: {
            type: DataTypes.STRING(255),
        },
        hour: {
            type: DataTypes.INTEGER,
            defaultValue: 22
        },
        minute: {
            type: DataTypes.INTEGER,
            defaultValue: 00
        }
    });
}