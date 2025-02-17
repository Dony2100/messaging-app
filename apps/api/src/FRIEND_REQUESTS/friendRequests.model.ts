import { model, Schema } from 'mongoose'
import { IFriendRequest } from 'shared'

const friendRequestModel = new Schema<IFriendRequest>({
	recipient: String,
	requester: String,
	status: {
		type: String,
		default: 'pending',
	},
})

export default model('friendRequest', friendRequestModel)
