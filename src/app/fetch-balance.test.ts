import { fetchBalance } from './fetch-balance'
import { IncomingMessage } from 'http'
import { strictEqual } from 'assert'
import { getBalanceDev } from 'dev-distribution/src/libs'

// tslint:disable:no-expression-statement no-http-string

const mockRequest = (url: string) => ({ url } as IncomingMessage)

describe('fetch-balance', () => {
	describe('Get the number of tokens for the specified address', () => {
		it('Valid address', async () => {
			const balance = await fetchBalance(mockRequest('http://localhost/chalk'))
			const expected = await getBalanceDev(
				'0xfb5c0e6400a95e4191d46196073d30a289abd15c'
			)
			strictEqual(balance, expected.balance)
		}).timeout(10000)

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
				await fetchBalance(mockRequest('http://localhost/n')),
				undefined
			)
		})
	})
})
