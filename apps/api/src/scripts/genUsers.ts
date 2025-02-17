import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { Document, Types } from 'mongoose'
import { IUser } from 'shared'
import UsersModel from '../USERS/users.model'
import { TSignUpInput } from '../USERS/users.types'

export type TUserDoc = Document<unknown, unknown, IUser> &
	IUser & {
		_id: Types.ObjectId
	}

export const genUser = async (usersNumber: number) => {
	console.log(chalk.yellow('Creating Users...'))
	const users: TSignUpInput[] = []
	for (let idx = 0; idx < usersNumber; idx++) {
		users.push({
			email: faker.internet.email(),
			password: 'password',
			userName: faker.internet.userName(),
			avatar: faker.image.avatarGitHub(),
			friends: [],
		})
	}

	return await UsersModel.create(users)
}
