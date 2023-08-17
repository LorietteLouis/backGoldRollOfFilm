const bcrypt = require('bcrypt')
const roles = require('./roles.json')
const genre = require('./genre.json')
const mockFilm = require('./mock-docFilm')

module.exports = (FilmModel, UserModel, RoleModel, ReviewModel, GenreModel, ContientModel) =>{
    const rolePromises = roles.map(role =>{
        return RoleModel.create({
            label: role
        })
    })
    const genrePromises = genre.map(genre =>{
        return GenreModel.create({
            label: genre
        })
    })
    
    
    Promise.allSettled(genrePromises).then(()=>{
        const ContientPromises = []
        return ContientPromises.push(
            then((genre, film)=> {
        return ContientModel.create({
            FilmId: film.id,
            GenreId: genre.id
        })
    }))
    })

    
    Promise.all(rolePromises).then(()=> {
        const userPromises = []
        userPromises.push(
            RoleModel.findOne({ where: {label: 'moderator'} })
            .then(role => {
                return bcrypt.hash('ABusDhaBit', 10)
                .then(hash=>{
                    return UserModel.create({
                        username:'Utruna',
                        password: hash,
                        RoleId: role.id
                    })
                })
            }),
            RoleModel.findOne({ where: {label: 'admin'} })
                .then(role => {
                    return bcrypt.hash('TiAAndOsCard', 10)
                    .then(hash=>{
                        return UserModel.create({
                            username:'Andariell',
                            password: hash,
                            RoleId: role.id
                        })
                    })
                }),
                RoleModel.findOne({ where: {label: 'user'} })
                .then(role => {
                    return bcrypt.hash('UnDerTaKer', 10)
                    .then(hash=>{
                        return UserModel.create({
                            username:'UnderSioul',
                            password: hash,
                            RoleId: role.id
                        })
                    })
                }),
                RoleModel.findOne({ where: {label: 'user'} })
                .then(role => {
                    return bcrypt.hash('ATlanThroPiA', 10)
                    .then(hash=>{
                        return UserModel.create({
                            username:'Sioul',
                            password: hash,
                            RoleId: role.id
                        })
                    })
                }),
        )
        
        Promise.all(userPromises).then(()=>{
                    const filmPromises = mockFilm.map(mock =>{
                        return FilmModel.create({
                            id:mock.id,
                            title_vf:mock.title_vf,
                            title_original:mock.title_original,
                            countries:mock.countries,
                            years:mock.years,
                            release_date:mock.release_date,
                            synopsis:mock.synopsis,
                            UserId:2,     
                        });
                    })
                    Promise.all(filmPromises).then(()=>{
                        ReviewModel.create({
                            content: 'Critique 1',
                            rating: 50,
                            FilmId: 1,
                            UserId: 3
                        })
                        ReviewModel.create({
                            content: 'Critique 2',
                            rating: 50,
                            FilmId: 1,
                            UserId: 4
                        })
                    })
                })
            })
    

}