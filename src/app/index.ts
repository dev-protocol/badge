import micro from 'micro'
import { fetchBalance } from './fetch-balance'
import { svg } from './svg'

export const app = micro(async (req, res) => {
	const balance = await fetchBalance(req)
	const body = svg(balance)
	// tslint:disable-next-line:no-expression-statement no-unused-expression
	body && res.setHeader('Content-Type', 'image/svg+xml')
	return body
})
