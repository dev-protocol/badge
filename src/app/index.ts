import { fetchBalance } from './fetch-balance'
import { svg } from './svg'
import { NowRequest, NowResponse } from '@vercel/node'
import { setHeader } from '../lib/set-header'

export const app = async (
	req: NowRequest,
	res: NowResponse
): Promise<NowResponse> => {
	const balance = await fetchBalance(req.query.address)
	const body = svg(balance)
	const response = body ? setHeader(res) : res
	return response.send(body)
}
