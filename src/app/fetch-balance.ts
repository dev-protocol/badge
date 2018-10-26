import { IncomingMessage } from 'http'
import { parse } from 'url'
import { getBalanceDev } from 'dev-distribution/src/libs'
import { AddressBalance } from 'dev-distribution/src/types'

const getPath = (req: IncomingMessage) =>
	(parsed => parsed.pathname)(parse(req.url || ''))

const fetch = async (address?: string): Promise<AddressBalance | undefined> =>
	address ? getBalanceDev(address.replace(/\//g, '')) : undefined

const balance = (data?: AddressBalance) => (data ? data.balance : undefined)

export const fetchBalance = async (req: IncomingMessage) => {
	const path = getPath(req)
	const etherscan = await fetch(path)
	return balance(etherscan)
}
