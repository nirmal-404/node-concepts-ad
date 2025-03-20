require('dotenv').config()
const express = require('express')
const authorRoutes = require('./routes/authorRoutes')
const bookRoutes = require('./routes/bookRoutes')

const app = express()
app.use(express.json())

app.use('/api/author' , authorRoutes)
app.use('/api/book' , bookRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()  => console.log(`Server is now running at port ${PORT}`))

