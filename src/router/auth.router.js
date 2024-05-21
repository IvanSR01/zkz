import { Router } from 'express'
import authController from '../controller/auth.controller.js'

const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.post('/getTokens', authController.getTokens)

export default authRouter
