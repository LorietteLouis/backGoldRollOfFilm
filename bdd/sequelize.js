const {Sequelize, DataTypes} = require('sequelize');
const setDataSample = require('./setDataSample')


const sequelize = new Sequelize ('goldenrolloffilm', 'root', '',{
    host:'localhost',
    dialect:'mariadb',
    logging: false,
    port: 3306,
});

sequelize.authenticate()
    .then(() => console.log('Connexion Base de Données établie.'))
    .catch(error => console.log('Connexion Base de Données impossible ${error}'))
 
    
    const defineFilmModel = require('../models/filmModelDefinition')
    const defineUserModel = require('../models/userModelDefinition')
    const defineRoleModel = require('../models/roleModelDefinition')
    const defineReviewModel = require('../models/reviewModelDefinition')
    const defineGenreModel = require('../models/genreModelDefinition')
    const defineContientModel = require('../models/contientModelDefinition')
    
    const FilmModel = defineFilmModel(sequelize, DataTypes)
    const UserModel = defineUserModel(sequelize, DataTypes)
    const RoleModel = defineRoleModel(sequelize, DataTypes)
    const ReviewModel = defineReviewModel(sequelize, DataTypes)
    const GenreModel = defineGenreModel(sequelize,DataTypes)
    const ContientModel = defineContientModel(sequelize,DataTypes)


RoleModel.hasMany(UserModel)
UserModel.belongsTo(RoleModel)

ReviewModel.belongsTo(UserModel);
UserModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
});

UserModel.hasMany(FilmModel, {
    foreignKey:{
        allowNull:false
    }
});

ContientModel.belongsTo(GenreModel);
GenreModel.hasMany(ContientModel)
FilmModel.hasMany(ContientModel, {
    foreignKey:{
        allowNull:false
    }
});


ReviewModel.belongsTo(FilmModel);
FilmModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
});

const initDb = () => {
    sequelize
        .sync({ force: true })
        .then(() => {
            setDataSample(FilmModel,UserModel,RoleModel,ReviewModel, GenreModel,ContientModel)
        })
}
module.exports = {
    initDb, sequelize, FilmModel, UserModel, RoleModel, ReviewModel, GenreModel, ContientModel
}
