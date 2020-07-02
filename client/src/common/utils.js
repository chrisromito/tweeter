import { pipe } from 'ramda'


export const toPojo = pipe(
    JSON.stringify,
    JSON.parse
)
