import { fetchBalance } from './fetch-balance'
import { svg } from './svg'
import { IncomingMessage, ServerResponse } from 'http'
import { setHeader } from '../lib/set-header'
import { send } from 'micro'

export const app = async (
	req: IncomingMessage,
	res: ServerResponse
): Promise<void> => {
	const balance = await fetchBalance(req)
	const body = svg(balance)
	const response = body ? setHeader(res) : res
	return send(response, 200, body)
}
