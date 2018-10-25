import micro from 'micro'
import { fetchBalance } from './fetch-balance'
import { svg } from './svg'

export const app = micro(async (req, res) => {
	const balance = await fetchBalance(req)
	// tslint:disable-next-line:no-expression-statement
	res.setHeader('Content-Type', 'image/svg+xml')
	return svg(balance)
})
