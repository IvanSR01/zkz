import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		adress: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,

		},
		reports: {
			type: Array,
			default: [],
			ref: 'Report'
		}
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Order', OrderSchema)
