import coctailRoute from '../routes/coctail.route'
import express from 'express'
import userRoute from '../routes/user.route'
import * as dotenv from 'dotenv'

const PORT = dotenv.config().parsed.PORT

export const app = express()
app.use(express.json())

app.use('/api', userRoute)
app.use('/api', coctailRoute)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
