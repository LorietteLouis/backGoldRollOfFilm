const { DataTypes, Sequelize } = require("sequelize")

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('Contient',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })
}