import { IChatMsg } from 'shared'

export type TMessageInput = Pick<IChatMsg, 'targetId' | 'text' | 'senderId'>
