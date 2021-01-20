import metric_suffix from 'metric-suffix'
import BigNumber from 'bignumber.js'
import stringPixelWidth from 'string-pixel-width'

type Props = {
	readonly balance: string
	readonly width: number
}

const font = 'Arial' // Verdana
const fontSize = 11
const toStr = (num: number): string => new BigNumber(num).toString(10)
const slice = (str: string, pos: number): string => str.slice(0, pos)

export const pixel = (str: string): number =>
	// tslint:disable-next-line: no-unsafe-any
	stringPixelWidth(str, {
		font,
		size: fontSize,
	})

const length = 6
const below1000 = (num: number): string =>
	((sliced) => {
		return sliced.endsWith('0') || sliced.length < length
			? sliced
			: sliced.replace(/.$/, '+')
	})(slice(toStr(num), length))
const suffix = (num: number) => (precision: number) =>
	metric_suffix(num, precision)
const iso = (fn: (num: number) => string): string =>
	((less, more) => (less === more ? less : less))(fn(3), fn(99))
const friendlyNumber = (num: number): string =>
	num === 0 ? '-' : num > 1000 ? iso(suffix(num)) : below1000(num)

const pathTransformX = (width: number): number =>
	width > 38 ? 0 : 0 - (38 - width)
const genProps = (num: number): Props =>
	((balance) => ({
		balance,
		width: pixel(balance),
	}))(friendlyNumber(num))

const svgWidth = (transformX: number, orig = 130): number => orig + transformX

export const createSVG = (props: Props): string =>
	((transformX) => `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Dev_Badge" x="0px" y="0px" viewBox="0 0 ${svgWidth(
		transformX
	)} 20" width="${svgWidth(
		transformX
	)}" height="20" xml:space="preserve" role="article">
	<style type="text/css">
		.st0{fill:#231F20;}
		.st1{fill:#FFFFFF;}
		.st2{font-family:'${font}';}
		.st3{font-size:${fontSize}px;}
		.st4{fill:#00D0FD;}
		.st5{fill:#D500E6;}
		.st6{fill:#5B8BF5;}
		.st7{fill:#FF3815;}
	</style>
	<g id="Background">
		<path id="Right" transform="matrix(1 0 0 1 ${transformX} 0)" class="st0" d="M126.9,0H87.1v20h39.8c1.7,0,3-1.3,3-3V3C129.9,1.3,128.6,0,126.9,0z"/>
		<path id="Left" d="M3,0C1.3,0,0,1.3,0,3v14c0,1.7,1.3,3,3,3h84.1V0H3z"/>
	</g>
	<g role="heading" aria-level="1" aria-label="Support on DEV">
		<g>
			<path class="st1" d="M11.1,9.1H9.8c0-1-0.6-1.5-1.6-1.5c-0.8,0-1.4,0.4-1.4,1c0,0.7,0.5,0.9,1.8,1.2c1.5,0.4,2.7,0.7,2.7,2.4   c0,1.5-1.2,2.4-2.9,2.4c-1.9,0-3-1-3-2.8h1.4c0,1.1,0.6,1.7,1.7,1.7c1,0,1.6-0.5,1.6-1.2c0-0.8-0.6-1-1.8-1.3   c-1.5-0.4-2.7-0.7-2.7-2.4c0-1.3,1.1-2.2,2.8-2.2C10.1,6.5,11.1,7.4,11.1,9.1z"/>
			<path class="st1" d="M12.6,12.3V8.9h1.3v3.3c0,1,0.4,1.4,1.1,1.4c0.7,0,1.3-0.5,1.3-1.6V8.9h1.3v5.6h-1.2v-0.7h0   c-0.4,0.5-0.9,0.9-1.7,0.9C13.3,14.6,12.6,13.9,12.6,12.3z"/>
			<path class="st1" d="M24.3,11.7c0,1.8-0.9,2.9-2.3,2.9c-0.7,0-1.3-0.3-1.6-0.9h0v2.8h-1.3V8.9h1.2v0.8h0c0.3-0.6,1-0.9,1.7-0.9   C23.4,8.8,24.3,9.9,24.3,11.7z M20.3,11.7c0,1.2,0.5,2,1.4,2c0.8,0,1.4-0.8,1.4-2c0-1.2-0.5-2-1.4-2C20.8,9.7,20.3,10.5,20.3,11.7z   "/>
			<path class="st1" d="M30.8,11.7c0,1.8-0.9,2.9-2.3,2.9c-0.7,0-1.3-0.3-1.6-0.9h0v2.8h-1.3V8.9h1.2v0.8h0c0.3-0.6,1-0.9,1.7-0.9   C29.9,8.8,30.8,9.9,30.8,11.7z M26.7,11.7c0,1.2,0.5,2,1.4,2c0.8,0,1.4-0.8,1.4-2c0-1.2-0.5-2-1.4-2C27.3,9.7,26.7,10.5,26.7,11.7z   "/>
			<path class="st1" d="M37.2,11.7c0,1.8-1.1,3-2.8,3c-1.7,0-2.8-1.1-2.8-3c0-1.8,1.1-3,2.8-3C36.2,8.7,37.2,9.9,37.2,11.7z M33,11.7   c0,1.2,0.5,2,1.4,2c0.9,0,1.4-0.8,1.4-2c0-1.2-0.5-2-1.4-2C33.6,9.7,33,10.5,33,11.7z"/>
			<path class="st1" d="M41.7,8.9V10c-0.2,0-0.3,0-0.4,0c-1,0-1.6,0.6-1.6,1.8v2.7h-1.3V8.9h1.2v0.8h0c0.4-0.6,0.9-0.9,1.6-0.9   C41.4,8.8,41.6,8.9,41.7,8.9z"/>
			<path class="st1" d="M45.4,13.5v1c-0.2,0.1-0.5,0.1-0.7,0.1c-1.2,0-1.7-0.5-1.7-1.7v-3H42v-1H43V7.5h1.3v1.4h1.1v1h-1.1v2.8   c0,0.6,0.2,0.9,0.8,0.9C45.1,13.5,45.3,13.5,45.4,13.5z"/>
			<path class="st1" d="M54.1,11.7c0,1.8-1.1,3-2.8,3c-1.7,0-2.8-1.1-2.8-3c0-1.8,1.1-3,2.8-3C53.1,8.7,54.1,9.9,54.1,11.7z    M49.9,11.7c0,1.2,0.5,2,1.4,2c0.9,0,1.4-0.8,1.4-2c0-1.2-0.5-2-1.4-2C50.5,9.7,49.9,10.5,49.9,11.7z"/>
			<path class="st1" d="M60.3,11.1v3.4H59v-3.3c0-1-0.4-1.4-1.1-1.4c-0.7,0-1.3,0.5-1.3,1.6v3.1h-1.3V8.9h1.2v0.7h0   c0.4-0.5,0.9-0.9,1.7-0.9C59.5,8.8,60.3,9.5,60.3,11.1z"/>
		</g>
		<g>
			<path class="st1" d="M63.9,6.5h2.8c2.3,0,3.9,1.6,3.9,4c0,2.5-1.5,4-3.9,4h-2.8V6.5z M66.5,13.4c1.9,0,2.9-1,2.9-3   c0-1.8-1-2.9-2.8-2.9H65v5.9H66.5z"/>
			<path class="st1" d="M72.4,6.5H78v1.1h-4.5v2.3h3.4v1h-3.4v2.6H78v1.1h-5.7V6.5z"/>
			<path class="st1" d="M79.1,6.5h1.3l1.6,5.3c0.2,0.6,0.3,1.1,0.3,1.8h0.5c0-0.6,0.1-1.1,0.3-1.8l1.7-5.3H86l-2.6,8h-1.7L79.1,6.5z"/>
		</g>
	</g>
	<text transform="matrix(1 0 0 1 89 14.5)" class="st1 st2 st3">${
		props.balance
	}</text>
	<g>
		<path class="st4" d="M66,18h-2v2h2V18z"/>
		<path class="st5" d="M70.9,18H68v2h2.9H73v-2H70.9z"/>
		<path class="st6" d="M68,18h-2v2h2V18z"/>
		<path class="st7" d="M80.3,18H73v2h7.3H87v-2H80.3z"/>
	</g>
</svg>
`)(pathTransformX(props.width))

export const svg = (num?: number): string =>
	typeof num === 'number' ? createSVG(genProps(num)) : ''
