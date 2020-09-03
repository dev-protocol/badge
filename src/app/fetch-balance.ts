import { IncomingMessage } from 'http'
import { parse } from 'url'
import { gql } from 'graphql-request'
import fetch from 'node-fetch'

interface IPropertyLockedUpResult {
	readonly data: {
		readonly property_lockup_sum_values: readonly {
			readonly sum_values: number
			readonly property_address: string
		}[]
	}
}

const GRAPHQL_BASE_URL = 'https://api.devprtcl.com/v1/graphql'

const getAddressFromPath = (req: IncomingMessage) =>
	((parsed) => (parsed.pathname || '').replace(/^\//, ''))(parse(req.url || ''))

const getBalanceByPropertyAddress = async (propertyAddress: string) => {
	const propertyLockedQuery = gql`
		query getBalanceByPropertyAddress($address: String) {
			property_lockup_sum_values(
				where: { property_address: { _eq: $address } }
			) {
				sum_values
				property_address
			}
		}
	`

	return fetch(GRAPHQL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			query: propertyLockedQuery,
			variables: { address: propertyAddress },
		}),
	})
		.then((r) => r.json())
		.then((data: IPropertyLockedUpResult) => data)
		.catch(() => ({
			data: { property_lockup_sum_values: [{ sum_values: 0 }] },
		}))
}

export const fetchBalance = async (req: IncomingMessage) => {
	const address = getAddressFromPath(req)
	const balance = address
		? await getBalanceByPropertyAddress(address)
		: undefined
	return balance
		? balance?.data?.property_lockup_sum_values?.[0]?.sum_values /
				Math.pow(10, 18)
		: 0
}
