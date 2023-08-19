const{UniqueConstrainError,ValidationError} = require ('sequelize')
const {ContientModel} = require('../bdd/sequelize')

exports.findAllContient = (req, res) => {
    ContientModel.scope()
        .findAll()
        .then(result => {
            res.json({message: 'La liste des films avec genre a bien été récupérée.', data:result})
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
}

exports.updateContient = (req, res) => {
    ContientModel
        .findByPk(req.params.id)
        .then(result =>{
            if (!result){
                res.status(404).json({message: `Aucun genre n'a été trouvé.`})
            } else {
                return result
                    .update(req.body)
                    .then(() => {
                        res.json({ message: `Avis modifié : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

exports.createContient = (req, res) => {
    GenreModel.findOne({ where: { id:GenreId} })
        .then(genre => {
            return ContientModel.create({ ...req.body, GenreId: genre.id})
                .then(result => {
                    res.json({ message: `création d'une affiche`, data: result })
                })
        })
        .catch(error => {
            res.status((500)).json({ message: error.message })
        })
}

