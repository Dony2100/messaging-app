import { model, Schema } from 'mongoose'
import { IChatMsg } from 'shared'

const messageSchema = new Schema<IChatMsg>({
	senderId: String,
	targetId: String,
	text: String,
	status: { type: String, default: 'sent' },
})

export default model('message', messageSchema)
