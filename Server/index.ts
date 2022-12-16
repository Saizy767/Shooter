import cors from 'cors'
import express from 'express'
import userRoute from './src/routes/user.route'
import coctailRoute from './src/routes/coctail.route'
import authRoute from './src/routes/auth.route'

const PORT = process.env.PORT || 4000
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

export const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/', userRoute, cors(corsOptions))
app.use('/api/', coctailRoute)
app.use('/api/', authRoute)

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}