import { IncomingMessage } from 'http'
import { parse } from 'url'
import { getBalanceDev } from 'dev-distribution/src/libs'
import { AddressBalance, DistributionTarget } from 'dev-distribution/src/types'
import { get } from 'request'

type DistributionTargets = ReadonlyArray<DistributionTarget>

const proto = 'https'
const getPackageNamePath = (req: IncomingMessage) =>
	(parsed => (parsed.pathname || '').replace(/^\//, ''))(parse(req.url || ''))

const validateAddress = (address: string) =>
	address.length === 42 && address.startsWith('0x')

const fetchPackages = async (): Promise<DistributionTargets> =>
	new Promise<DistributionTargets>(resolve =>
		get(
			`${proto}://dev-distribution.now.sh/config/packages`,
			{ json: true },
			(_, __, body) => resolve(body)
		)
	)

const fetchDev = async (
	address?: string
): Promise<AddressBalance | undefined> =>
	address && validateAddress(address) ? getBalanceDev(address) : undefined

const balance = (data?: AddressBalance) => (data ? data.balance : undefined)

export const fetchBalance = async (req: IncomingMessage) => {
	const name = getPackageNamePath(req)
	const pkgs = await fetchPackages()
	const address = (pkg => (pkg ? pkg.address : undefined))(
		pkgs.find(pkg => pkg.package === name)
	)
	const etherscan = await fetchDev(address)
	return balance(etherscan)
}
