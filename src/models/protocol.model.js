
import mongoose from 'mongoose'

const ProtocolSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		column : {
			
		}
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Protocol', ProtocolSchema)