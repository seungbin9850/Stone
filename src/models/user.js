module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
        },
        email: {
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
        }
    });
}