import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my Portfolio application.',
  })
})

async function startServer() {
  try {
    // Start accepting requests only after the database connects.
    await mongoose.connect(config.mongoUri, {
      dbName: 'Portfolio',
      serverSelectionTimeoutMS: 10000,
    })

    console.log('Connected to MongoDB database: Portfolio')

    app.listen(config.port, () => {
      console.log(`Backend running at http://localhost:${config.port}`)
    })
  } catch (error) {
    console.error('Database connection failed:', error.name)
    console.error('Error code:', error.code)
    console.error('Details:', error.message)
  }
}

startServer()