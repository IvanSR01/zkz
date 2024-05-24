import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Order', OrderSchema)
