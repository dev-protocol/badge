// tslint:disable-next-line:no-require-imports
import metric_suffix = require('metric-suffix')
import BigNumber from 'bignumber.js'
import * as stringPixelWidth from 'string-pixel-width'

interface Props {
	readonly balance: string
	readonly width: number
}

const font = 'Arial' // Verdana
const fontSize = 11
const toStr = (num: number) => new BigNumber(num).toString(10)
const slice = (str: string, pos: number) => str.slice(0, pos)

export const pixel = (str: string): number =>
	// tslint:disable-next-line: no-unsafe-any
	stringPixelWidth(str, {
		font,
		size: fontSize,
	})

const length = 6
const below1000 = (num: number) =>
	((sliced) => {
		return sliced.endsWith('0') || sliced.length < length
			? sliced
			: sliced.replace(/.$/, '+')
	})(slice(toStr(num), length))
const suffix = (num: number) => (precision: number) =>
	metric_suffix(num, precision)
const iso = (fn: (num: number) => string) =>
	((less, more) => (less === more ? less : `${less}+`))(fn(3), fn(99))
const friendlyNumber = (num: number) =>
	num === 0 ? '-' : num > 1000 ? iso(suffix(num)) : below1000(num)

const pathTransformX = (width: number) => (width > 38 ? 0 : 0 - (38 - width))
const genProps = (num: number): Props =>
	((balance) => ({
		balance,
		width: pixel(balance),
	}))(friendlyNumber(num))

const svgWidth = (transformX: number, orig = 90) => orig + transformX

export const createSVG = (props: Props) =>
	((transformX) => `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Dev_Badge" x="0px" y="0px" viewBox="0 0 ${svgWidth(
		transformX
	)} 20" width="${svgWidth(transformX)}" height="20" xml:space="preserve">
<style type="text/css">
	.st0{fill:#231F20;}
	.st1{enable-background:new;}
	.st2{fill:#FFFFFF;}
	.st3{font-family:'${font}';}
	.st4{font-size:${fontSize}px;}
	.st5{fill:url(#Gradient_1_);}
</style>
<g id="Background">
	<path id="Right" transform="matrix(1 0 0 1 ${transformX} 0)" class="st0" d="M87,0H37v20h50c1.7,0,3-1.3,3-3V3C90,1.3,88.7,0,87,0z"/>
	<path id="Left" d="M3,0C1.3,0,0,1.3,0,3v14c0,1.7,1.3,3,3,3h34V0H3z"/>
</g>
<g id="Dev" class="st1">
	<path class="st2" d="M7.1,6.1h3.5c2.5,0,4.2,1.5,4.2,3.8s-1.7,3.8-4.2,3.8H7.1V6.1z M10.5,12.3c1.5,0,2.5-0.9,2.5-2.4   s-1-2.4-2.5-2.4H8.8v4.8C8.8,12.3,10.5,12.3,10.5,12.3z"/>
	<path class="st2" d="M20.5,11.9l0.9,1c-0.6,0.6-1.4,1-2.4,1c-2,0-3.4-1.3-3.4-3c0-1.8,1.3-3,3.2-3c1.7,0,3,1.1,3.1,3l-4.4,0.8   c0.3,0.6,0.8,0.9,1.6,0.9C19.6,12.5,20.1,12.3,20.5,11.9z M17.3,10.7l2.9-0.6c-0.2-0.6-0.7-1-1.4-1C17.9,9.1,17.3,9.7,17.3,10.7z"/>
	<path class="st2" d="M28.7,7.9l-2.5,5.9h-1.8L22,7.9h1.8l1.6,4l1.7-4C27.1,7.9,28.7,7.9,28.7,7.9z"/>
</g>
<text transform="matrix(1 0 0 1 43 14.5)" class="st2 st3 st4">${
		props.balance
	}</text>
<linearGradient id="Gradient_1_" gradientUnits="userSpaceOnUse" x1="-3.051758e-05" y1="19.1596" x2="37" y2="19.1596">
	<stop offset="0" style="stop-color:#00EBFF"/>
	<stop offset="0.35" style="stop-color:#F200DF"/>
	<stop offset="1" style="stop-color:#FF4700"/>
</linearGradient>
<path id="Gradient" class="st5" d="M3,20h34v-1.7H0.3C0.8,19.3,1.8,20,3,20z"/>
</svg>
`)(pathTransformX(props.width))

export const svg = (num?: number) =>
	typeof num === 'number' ? createSVG(genProps(num)) : ''
