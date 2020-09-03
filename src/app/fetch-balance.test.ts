/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { fetchBalance } from './fetch-balance'
import { strictEqual } from 'assert'
import { stub } from 'sinon'
import * as fetch from 'node-fetch'

stub(fetch, 'default').callsFake(
	async (_url: any, _init: any) =>
		({
			json: async () => {
				return Promise.resolve({
					data: {
						property_lockup_sum_values: [
							{
								sum_values: '123456000000000000000000',
								property_address: '0x0',
							},
						],
					},
				})
			},
		} as any)
)

describe('fetch-balance', () => {
	describe('Get the number of tokens for the specified address', () => {
		it('Valid address', async () => {
			const balance = await fetchBalance(
				'0xfb5c0e6400a95e4191d46196073d30a289abd15c'
			)
			strictEqual(balance, 123456)
		}).timeout(10000)

		it('Valid address as an array', async () => {
			const balance = await fetchBalance([
				'0xfb5c0e6400a95e4191d46196073d30a289abd15c',
			])
			strictEqual(balance, 123456)
		}).timeout(10000)

		it('Invalid address', async () => {
			strictEqual(await fetchBalance(), 0)
		})
	})
})
