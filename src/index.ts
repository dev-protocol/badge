import { app } from './app'
import * as getPort from 'get-port'
import { Server } from 'http'

const protocol = 'http'
const serve = async (apps: Server) =>
	getPort({ port: 3000 }).then(port => apps.listen(port))
;(async () => {
	const server = await serve(app)
	;(address => {
		const url =
			typeof address !== 'string'
				? `running at ${protocol}://127.0.0.1:${address.port}`
				: address
		// tslint:disable-next-line:no-expression-statement
		console.log(url)
	})(server.address())
})().catch(err => console.error(err))
