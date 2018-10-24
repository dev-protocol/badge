import { IncomingMessage } from 'http'
import { parse } from 'url'
import * as requestPromise from 'request-promise'

interface EtherscanResponseBody {
	readonly status: number
	readonly message: string
	readonly result: number
}

const getPath = (req: IncomingMessage) =>
	(parsed => parsed.pathname)(parse(req.url || ''))

const fetch = async <T>(
	address?: T
): Promise<EtherscanResponseBody | undefined> =>
	address
		? requestPromise(
				`https://welg1mzug8.execute-api.us-east-1.amazonaws.com/prototype/?address=${address}`
		  )
		: undefined

const balance = (data?: EtherscanResponseBody) =>
	data ? data.result : undefined

export const fetchBalance = async (req: IncomingMessage) => {
	const path = getPath(req)
	const etherscan = await fetch(path)
	return balance(etherscan)
}
