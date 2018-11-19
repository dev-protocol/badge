import { fetchBalance } from './fetch-balance'
import { svg } from './svg'
import { IncomingMessage, ServerResponse } from 'http'

export const app = async (req: IncomingMessage, res: ServerResponse) => {
	const balance = await fetchBalance(req)
	const body = svg(balance)
	// tslint:disable-next-line:no-expression-statement no-unused-expression
	body && res.setHeader('Content-Type', 'image/svg+xml')
	return res.end(body)
}
