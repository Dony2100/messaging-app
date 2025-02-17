import cookie from 'cookie-parser'
import cors from 'cors'
import express, { Express, RequestHandler } from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import path from 'path'
import friendRequestRouter from '../FRIEND_REQUESTS/friendRequests.router'
import messagesRouter from '../MESSAGES/messages.router'
import usersRouter from '../USERS/users.router'
import { handleCsrfErr } from '../common/middleware'
import { CLIENT_ORIGIN, COOKIE_SECRET, IS_PROD } from './secrets'

//Set up cookie parser
export const cookieParser: RequestHandler = cookie(COOKIE_SECRET)

export default function createExpressApp(): Express {
	const app = express()

	// Enabling helmet
	app.use(helmet({ contentSecurityPolicy: false }))

	// Prevent http param pollution
	app.use(hpp())

	//parse json body
	app.use(express.json())

	// Limiting each IP to 100 requests per windowMs
	/*if (IS_PROD) {
		app.set('trust proxy', 1)

		const limiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100,
			standardHeaders: 'draft-7',
			legacyHeaders: false,
		})

		app.use('/api', limiter)
	}*/

	//config cors
	if (!IS_PROD) app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }))

	// Dev logging middleware
	if (!IS_PROD) {
		app.use(morgan('dev'))
	}

	app.use(cookieParser)

	app.use('/api/users', usersRouter)
	app.use('/api/messages', messagesRouter)
	app.use('/api/friend-requests', friendRequestRouter)

	app.get('/ip', (req, res) => res.send(req.ip))

	const distPath = path.join(IS_PROD ? '../../' : '../../..', '/web/dist')
	app.use(express.static(path.join(import.meta.dirname, distPath)))
	app.get('*', function (req, res) {
		res.sendFile(path.join(import.meta.dirname, distPath, 'index.html'))
	})

	//set csurf error
	app.use(handleCsrfErr)

	return app
}
