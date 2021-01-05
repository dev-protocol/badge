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
	((less, more) => (less === more ? less : `${less}+`))(fn(3), fn(99))
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
	.st4{fill:url(#Gradient_1_);}
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
		<path class="st1" d="M70.9,10.6c0,2.3-1.7,3.9-4.1,3.9h-3.2V6.8h3.3C69.2,6.8,70.9,8.4,70.9,10.6z M69.1,10.7c0-1.4-1-2.4-2.3-2.4   h-1.5V13h1.6C68.1,13,69.1,12.1,69.1,10.7z"/>
		<path class="st1" d="M76.3,12.5l1,0.9c-0.7,0.8-1.6,1.2-2.7,1.2c-1.9,0-3.1-1.2-3.1-3c0-1.8,1.2-3,3-3c1.7,0,2.8,1,2.9,2.7   l-4.1,1.1c0.3,0.6,0.8,0.9,1.4,0.9C75.3,13.2,75.9,13,76.3,12.5z M73.2,11.3l2.6-0.7c-0.2-0.6-0.6-0.8-1.2-0.8   C73.8,9.8,73.2,10.3,73.2,11.3z"/>
		<path class="st1" d="M79.4,8.6l1.4,4.3l1.4-4.3h1.7l-2.2,5.9h-1.7l-2.2-5.9L79.4,8.6z"/>
	</g>
</g>
<text transform="matrix(1 0 0 1 89 14.5)" class="st1 st2 st3">${
		props.balance
	}</text>
<linearGradient id="Gradient_1_" gradientUnits="userSpaceOnUse" x1="58.552" y1="1021.15" x2="86.5613" y2="1021.15" gradientTransform="matrix(1 0 0 1 0 -1002)">
	<stop offset="0" style="stop-color:#00EBFF"/>
	<stop offset="0.35" style="stop-color:#F200DF"/>
	<stop offset="1" style="stop-color:#FF4700"/>
</linearGradient>
<path id="Gradient" class="st4" d="M60.3,20h26.3v-1.7H60.3V20z"/>
</svg>
`)(pathTransformX(props.width))

export const svg = (num?: number): string =>
	typeof num === 'number' ? createSVG(genProps(num)) : ''
