import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		orderId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		protocols: {
			type: Array,
			default: [],
			ref: 'Protocol'
		},
		title: {
			type: {},
			default: {}
		}
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Report', ReportSchema)