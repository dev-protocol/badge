/* eslint-disable functional/no-expression-statement */
import { NowResponse } from '@vercel/node'

export const setHeader = (res: NowResponse): NowResponse => {
	res.setHeader('content-type', 'image/svg+xml')
	res.setHeader(
		'cache-control',
		'public, s-maxage=86400, stale-while-revalidate=3600, must-revalidate'
	)
	return res
}
