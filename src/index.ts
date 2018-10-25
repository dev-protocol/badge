import { run } from './run'
// tslint:disable-next-line:no-expression-statement
;(async () => console.log(`running at ${await run()}`))().catch(err =>
	console.error(err)
)
