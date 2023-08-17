const express = require ("express");
const router = express.Router();
const filmController = require("../controllers/filmController");
const authController = require ("../controllers/authController");
const {FilmModel} = require("../bdd/sequelize");
const multer = require("../middleware/multerConfig");

router
    .route("/")
    .get(filmController.findAllFilms)
        .post(
            authController.protect,
            authController.restrictTo("admin"),
            multer,
            filmController.createFilm
        );

        router.route("/withReview").get(filmController.findAllFilmsByReview);

        router.route("/rawSql").get(filmController.findAllFilmsWithRawSql);

        router
            .route("/:id")
            .get(filmController.findFilmByPk)
            .put(
                authController.protect,
                authController.restrictToOwnUser(FilmModel),
                filmController.updateFilm
            )
        
        module.exports = router;