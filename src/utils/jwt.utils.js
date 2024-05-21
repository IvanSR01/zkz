import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtUtils = {
	async getNewTokens(id) {
		const data = { id: id }
		const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
			expiresIn: '1h',
		})
		const refreshToken = jwt.sign(data, process.env.JWT_SECRET, {
			expiresIn: '15d',
		})

		return {
			accessToken,
			refreshToken,
		}
	},

	verifyToken(token) {
		return jwt.verify(token, process.env.JWT_SECRET)
	},
}
export default jwtUtils
