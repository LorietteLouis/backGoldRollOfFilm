module.exports = (sequelize,DataTypes) => {
    return sequelize.define('Genre',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label:DataTypes.STRING
    },{
        updatedAt: false,
        createdAt:false
    })
}