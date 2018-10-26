import { IncomingMessage } from 'http'
import { parse } from 'url'
import { getBalanceDev } from 'dev-distribution/src/libs'
import { AddressBalance } from 'dev-distribution/src/types'

const getPath = (req: IncomingMessage) =>
	(parsed => (parsed.pathname || '').replace(/\//g, ''))(parse(req.url || ''))

const validateAddress = (address: string) =>
	address.length === 42 && address.startsWith('0x')

const fetch = async (address?: string): Promise<AddressBalance | undefined> =>
	address && validateAddress(address) ? getBalanceDev(address) : undefined

const balance = (data?: AddressBalance) => (data ? data.balance : undefined)

export const fetchBalance = async (req: IncomingMessage) => {
	const path = getPath(req)
	const etherscan = await fetch(path)
	return balance(etherscan)
}
