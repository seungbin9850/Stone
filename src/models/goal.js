module.exports = (sequelize, DataTypes) => {
    return sequelize.define('goal', {
        year:{
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
        what: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        check: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });
}