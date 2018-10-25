import { app } from './app'
import * as getPort from 'get-port'
import { Server } from 'http'

const protocol = 'http'
const serve = async (apps: Server) =>
	getPort({ port: 3000 }).then(port => apps.listen(port))

export const run = async () => {
	const server = await serve(app)
	const address = server.address()
	return typeof address !== 'string'
		? `${protocol}://127.0.0.1:${address.port}`
		: address
}
