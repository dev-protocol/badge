import { app } from './app'
import * as getPort from 'get-port'
import { Server } from 'http'

const serve = async (apps: Server) => getPort().then(port => apps.listen(port))
;(async () => {
	const server = await serve(app)
	;(address => {
		const url =
			typeof address !== 'string'
				? // tslint:disable-next-line:no-http-string
				  `running at http://127.0.0.1:${address.port}`
				: address
		// tslint:disable-next-line:no-expression-statement
		console.log(url)
	})(server.address())
})().catch(err => console.error(err))
