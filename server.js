import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import apiRouter from './src/router/api.router.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4200
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', apiRouter)

app.listen(port, async () => {
	try {
		mongoose
			.connect(process.env.DB_URL)
			.then(() => console.log('DB ok'))
			.catch(err => console.log('DB error', err))
		console.log(`[server]: Server is running at http://localhost:${port}`)
	} catch (error) {
		console.log(error)
	}
})
