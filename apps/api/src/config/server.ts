import express from 'express'
import http from 'http'
import jwt from 'jsonwebtoken'
import { COOKIE_NAME } from '../USERS/users.strings'
import createExpressApp, { cookieParser } from './app'
import { IS_PROD, JWT_SECRET } from './secrets'
import wss from './socket'

export default function createServer() {
	const server = http.createServer(createExpressApp())

	server.on('upgrade', async (request, socket, head) => {
		if (!IS_PROD) console.log('Parsing cookie 🍪 from request...')

		const req = request as express.Request
		const res = {} as express.Response

		try {
			cookieParser(req, res, () => {
				const currentUserId = jwt
					.verify(req.signedCookies[COOKIE_NAME], JWT_SECRET)
					.toString()
				req.currentUserId = currentUserId

				if (!IS_PROD) console.log('Cookie 🍪 is parsed!')

				wss.handleUpgrade(req, socket, head, (ws) => {
					wss.emit('connection', ws, request)
				})
			})
		} catch (err) {
			socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
			socket.destroy()
		}
	})

	return server
}
