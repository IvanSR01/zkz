import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		number: {
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
		}
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Report', ReportSchema)