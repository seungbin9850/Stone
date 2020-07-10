module.exports = (sequelize, DataTypes) => {
    return sequelize.define('todo', {
        what: {
            type: DataTypes.STRING(200),
            allowNull: false,
        }
    });
}