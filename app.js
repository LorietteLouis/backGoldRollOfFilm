const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('./bdd/sequelize')
const path = require('path')
const app = express();

const port = 3042;

sequelize.initDb()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

const filmRouter = require('./routes/filmRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const contientRouter = require('./routes/contientRoutes')

app.use('/api/films', filmRouter)
app.use('/api/users',userRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/contient', contientRouter)

app.use('/images', express.static(path.join(__dirname,'image')))

app.use((req, res) => {
    res.status(404).json({ message: `L'url demandé n'existe pas.` })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})