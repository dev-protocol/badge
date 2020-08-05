import { IncomingMessage } from 'http'
import { parse } from 'url'
import { gql } from 'graphql-request'
import fetch from 'node-fetch'

interface IAuthenticationResult {
	readonly data: {
		readonly property_authentication: readonly { readonly property: string }[]
	}
}

interface IPropertyLockedUpResult {
	readonly data: {
		readonly property_lockup_sum_values: readonly {
			readonly sum_values: number
			readonly property_address: string
		}[]
	}
}

const GRAPHQL_BASE_URL = 'https://api.devprtcl.com/v1/graphql'

const getPackageNamePath = (req: IncomingMessage) =>
	((parsed) => (parsed.pathname || '').replace(/^\//, ''))(parse(req.url || ''))

const getPropertyFromName = async (name: string) => {
	const authenticationQuery = gql`
		query getPropertyFromName($name: String) {
			property_authentication(where: { authentication_id: { _eq: $name } }) {
				authentication_id
				property
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
			query: authenticationQuery,
			variables: { name },
		}),
	})
		.then((r) => r.json())
		.then((data: IAuthenticationResult) => data)
}

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
	const name = getPackageNamePath(req)
	const result = await getPropertyFromName(name)
	const address = result?.data?.property_authentication?.[0]?.property
	const etherscan = address
		? await getBalanceByPropertyAddress(address)
		: undefined
	return etherscan
		? etherscan?.data?.property_lockup_sum_values?.[0]?.sum_values /
				Math.pow(10, 18)
		: 0
}
