import coctailRoute from '../routes/coctail.route'
import cors from 'cors'
import express from 'express'
import userRoute from '../routes/user.route'
import * as dotenv from 'dotenv'

const PORT = dotenv.config().parsed.PORT

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', userRoute, cors(corsOptions))
app.use('/api', coctailRoute)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


