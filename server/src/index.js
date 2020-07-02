import dotenv from 'dotenv'
dotenv.config()
import { PORT } from './constants'
import app from './app'

export const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
export default server
