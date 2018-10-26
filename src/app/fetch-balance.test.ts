import { fetchBalance } from './fetch-balance'
import { IncomingMessage } from 'http'
import { strictEqual } from 'assert'
import { getBalanceDev } from 'dev-distribution/src/libs'

// tslint:disable:no-expression-statement no-http-string

const mockRequest = (url: string) => ({ url } as IncomingMessage)

describe('fetch-balance', () => {
	describe('Get the number of tokens for the specified address', () => {
		it('Valid address', async () => {
			const balance = await fetchBalance(
				mockRequest(
					'http://localhost/0xE23fe51187A807d56189212591F5525127003bdf'
				)
			)
			const expected = await getBalanceDev(
				'0xE23fe51187A807d56189212591F5525127003bdf'
			)
			strictEqual(balance, expected.balance)
		})

		it('Invalid address', async () => {
			strictEqual(
				await fetchBalance(mockRequest('http://localhost/')),
				undefined
			)

			strictEqual(
				await fetchBalance(mockRequest('http://localhost/xxx')),
				undefined
			)

			strictEqual(
				await fetchBalance(
					mockRequest(
						'http://localhost/xxE23fe51187A807d56189212591F5525127003bdf'
					)
				),
				undefined
			)
		})
	})
})
