/* eslint-disable functional/no-class */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { fetchBalance } from './fetch-balance'
import { strictEqual } from 'assert'
import { stub } from 'sinon'
import * as devKit from '@devprotocol/dev-kit'

stub(devKit, 'contractFactory').callsFake(
	() =>
		({
			registry: () => ({ lockup: async () => '' }),
			lockup: () => ({
				getPropertyValue: async () => '123456000000000000000000',
			}),
		} as any)
)

describe('fetch-balance', () => {
	describe('Get the number of tokens for the specified address', () => {
		process.env.JRON_RPC_ENDPOINT = 'http://localhost'
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
