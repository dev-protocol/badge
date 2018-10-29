import { strictEqual } from 'assert'
import { createSVG, svg, pixel } from './svg'

// tslint:disable:no-expression-statement no-http-string

describe('svg', () => {
	describe('Represent a numerical value with 6 or fewer characters', () => {
		it('0.0001 is 0.000+', () => {
			const expect = '0.000+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(0.0001)
			)
		})

		it('0.xxx is 0.xxx', () => {
			const expect = '0.123'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(0.123)
			)
		})

		it('9.999 is 9.999', () => {
			const expect = '9.999'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(9.999)
			)
		})

		it('9.9991 is 9.999+', () => {
			const expect = '9.999+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(9.9991)
			)
		})

		it('99.99 is 99.99', () => {
			const expect = '99.99'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(99.99)
			)
		})

		it('99.991 is 99.99+', () => {
			const expect = '99.99+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(99.991)
			)
		})

		it('999.9 is 999.9', () => {
			const expect = '999.9'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(999.9)
			)
		})

		it('999.91 is 999.9+', () => {
			const expect = '999.9+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(999.91)
			)
		})

		it('1000 is 1000', () => {
			const expect = '1000'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(1000)
			)
		})

		it('1000.1 is 1k+', () => {
			const expect = '1k+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(1000.1)
			)
		})

		it('1230 is 1.23k', () => {
			const expect = '1.23k'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(1230)
			)
		})

		it('1234.1 is 1.23k+', () => {
			const expect = '1.23k+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(1234.1)
			)
		})

		it('10000 is 10k', () => {
			const expect = '10k'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(10000)
			)
		})

		it('12300 is 12.3k', () => {
			const expect = '12.3k'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(12300)
			)
		})

		it('12345 is 12.3k+', () => {
			const expect = '12.3k+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(12345)
			)
		})

		it('1000000000 is 1G', () => {
			const expect = '1G'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(1000000000)
			)
		})

		it('1230000000 is 1.23G', () => {
			const expect = '1.23G'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(1230000000)
			)
		})

		it('1234567890 is 1.23G+', () => {
			const expect = '1.23G+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(1234567890)
			)
		})

		it('100000000000000 is 100T', () => {
			const expect = '100T'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(100000000000000)
			)
		})

		it('12300000000000 is 12.3T', () => {
			const expect = '12.3T'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(12300000000000)
			)
		})

		it('12345678901230 is 12.3T+', () => {
			const expect = '12.3T+'
			strictEqual(
				createSVG({ balance: expect, width: pixel(expect) }),
				svg(12345678901230)
			)
		})
	})
})
