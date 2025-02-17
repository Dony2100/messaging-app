import { Router } from 'express'
import { authenticate, validateInput } from '../common/middleware'
import { documentIdsValidationSchema } from '../common/validation'
import {
	createMessage,
	getMessagesByConversationMembers,
} from './messages.controllers'
import { createMessageValidationSchema } from './messages.validation'

const messagesRouter: Router = Router()

messagesRouter.post(
	'/',
	authenticate,
	validateInput(createMessageValidationSchema, 'messageInput'),
	createMessage
)

messagesRouter.post(
	'/conversation',
	authenticate,
	validateInput(documentIdsValidationSchema, 'userIds'),
	getMessagesByConversationMembers
)

export default messagesRouter
