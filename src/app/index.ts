import { fetchBalance } from './fetch-balance'
import { svg } from './svg'
import { IncomingMessage, ServerResponse } from 'http'

export const app = async (req: IncomingMessage, res: ServerResponse) => {
	const balance = await fetchBalance(req)
	const body = svg(balance)
	// tslint:disable-next-line:no-expression-statement no-unused-expression
	body &&
		res.setHeader('content-type', 'image/svg+xml') &&
		res.setHeader(
			'cache-control',
			'public, s-maxage=86400, stale-while-revalidate=3600, must-revalidate'
		)
	return res.end(body)
}
