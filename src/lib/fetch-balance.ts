import { gql } from 'graphql-request'
import fetch from 'node-fetch'
import { always } from 'ramda'

type IPropertyLockedUpResult = {
	readonly data: {
		readonly property_lockup_sum_values: readonly {
			readonly sum_values: number
		}[]
	}
}

const GRAPHQL_BASE_URL = 'https://api.devprtcl.com/v1/graphql'

const getBalanceByPropertyAddress = async (
	propertyAddress: string
): Promise<IPropertyLockedUpResult> => {
	const propertyLockedQuery = gql`
		query getBalanceByPropertyAddress($address: String) {
			property_lockup_sum_values(
				where: { property_address: { _eq: $address } }
			) {
				sum_values
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
		.catch(
			always({
				data: { property_lockup_sum_values: [{ sum_values: 0 }] },
			})
		)
}

export const fetchBalance = async (
	addressFromPath?: string | readonly string[]
): Promise<number> => {
	const address = addressFromPath
		? typeof addressFromPath === 'string'
			? addressFromPath
			: addressFromPath[0]
		: undefined
	const fromGQL = address
		? await getBalanceByPropertyAddress(address)
		: undefined
	const balance = fromGQL
		? fromGQL?.data?.property_lockup_sum_values?.[0]?.sum_values ?? 0
		: 0
	return balance ? balance / Math.pow(10, 18) : 0
}
