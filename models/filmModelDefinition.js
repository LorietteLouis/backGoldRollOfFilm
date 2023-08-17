module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Film',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title_vf:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:`Un film a surement un titre.`
                }
            },
            unique: {
                msg: `Ce film est déjà répertorié`
            }
        },
        title_original:{
            type:DataTypes.STRING,
            unique: {
                msg: `Ce film est déjà répertorié`
            }
        },
        years:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:`Une année doit être entrée`
                },
                isNumeric: {
                    msg: 'La superficie doit être un nombre'
                }
            }
        },
        release_date:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:`Une date doit être entrée`
                }
            }
        },
        synopsis:DataTypes.STRING,
        countries:DataTypes.STRING,
        picture:DataTypes.STRING

    })
}