import Web3 from 'web3'
import { addresses, contractFactory } from '@devprotocol/dev-kit'
import BigNumber from 'bignumber.js'

export const fetchBalance = async (
	addressFromPath?: string | readonly string[]
): Promise<number> => {
	const address = addressFromPath
		? typeof addressFromPath === 'string'
			? addressFromPath
			: addressFromPath[0]
		: undefined
	const devKit = contractFactory(
		new Web3.providers.HttpProvider(process.env.JRON_RPC_ENDPOINT!)
	)
	const locked = address
		? await devKit
				.lockup(await devKit.registry(addresses.eth.main.registry).lockup())
				.getPropertyValue(address)
		: 0
	return locked ? new BigNumber(locked).div(Math.pow(10, 18)).toNumber() : 0
}
