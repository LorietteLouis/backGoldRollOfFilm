const {UniqueConstraintError, ValidationError, Op, QueryType} = require('sequelize')
const {FilmModel, ReviewModel, sequelize}= require('../bdd/sequelize')

exports.findAllFilms = (req, res) => {
    FilmModel
        .findAll({include:[ReviewModel,PaysModel,GenreModel]})
        .then(result =>{
            res.json({message: 'La liste des film a bien été récupérée.', data: result })
        })
        .catch(error =>{
            res.status(500).json({message: error})
        })
}

exports.findAllFilmsWithRawSql = (req, res) => {
    sequelize.query("SELECT title_vf, rating FROM `film` LEFT JOIN `reviews` ON `film`.`id` = `reviews` = ``reviews`.`filmId`", {type:QueryTypes.SELECT})
    .then(result =>{
        res.json({message:'La liste des films a bien été récupérée.', data: result})
    })
    .catch(error =>{
        res.status(500).json({message: error})
    })
}

exports.findFilmByPk = (req, res) => {
    FilmModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: `L'élément ayant pour id ${req.params.id} n'existe pas.` })
            } else {
                res.json({ message: `L'élément a bien été récupéré.`, data: result })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Une erreur est survenue : ${error}` })
        })
}

exports.createFilm = (req, res) => {
    const newFilm = req.body
    FilmModel
    .create({
        title_vf:newFilm.title_vf,
        title_original:newFilm.title_original,
        years:newFilm.years,
        release_date:newFilm.release_date,
        synopsis:newFilm.synopsis,
        countries:newFilm.countries,
        UserId: newFilm.UserId,
        picture:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then((result) =>{
        res.status(201).json({message:'Un film à été ajouté.', data: result})
    })
    .catch((error)=>{
         if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: `Une erreur est survenue :  ${error}` })
    })
}

exports.updateFilm = (req, res) => {
    FilmModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Aucun film trouvé' })
            } else {
                return result
                    .update(req.body)
                    .then(() => {
                        res.json({ message: `Film modifié : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

exports.findAllFilmsByReview = (req, res) => {
    const minRate = req.query.minRate || 4
    FilmModel.findAll({
        include: {
            model: ReviewModel,
            where: {
                rating: { [Op.gte]: 4 }
            }
        }
    })
        .then((elements) => {
            const msg = 'La liste des films a bien été récupérée en base de données.'
            res.json({ message: msg, data: elements })
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({ message: msg })
        })
}

exports.findAllFilmsByReviewSQL = (req, res) => {
    return sequelize.query('SELECT name, rating FROM `films` LEFT JOIN `reviews` ON `films`.`id` = `reviews`.`FilmId`',
        {
            type: QueryTypes.SELECT
        }
    )
        .then(films => {
            const message = `Il y a ${films.length} films comme résultat de la requête en SQL pur.`
            res.json({ message, data: films })
        })
        .catch(error => {
            const message = `La liste des films n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}

exports.findAllFilmsByCountrySQL = (req, res) =>{
    return sequelize.query('SELECT name, rating FROM `films` LEFT JOIN `pays` ON `films`.`id` = `pays`.`FilmId`',
    {
        type: QueryTypes.SELECT
    }
)
    .then(films =>{
        const message = `Il y a ${films.length} films comme résultat de la requête en SQL pur.`
        res.json({ message, data: films })
    })
    .catch(error => {
        const message = `La liste des films n'a pas pu se charger. Reessayez ulterieurement.`
        res.status(500).json({ message, data: error })
    })
}