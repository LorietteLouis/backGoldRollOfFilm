const express = require ('express')
const router = express.Router()
const contientController = require ('../controllers/contientController')
const authController = require ('../controllers/authController')
const {ContientModel} = require ('../bdd/sequelize')

router
    .route('/')
    .get(contientController.findAllContient)

router
    .route('/:id')
    .post(authController.protect, contientController.createContient)
    .put(authController.protect, authController.restrictToOwnUser(ContientModel),contientController.updateContient)

module.exports = router