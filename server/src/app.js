import express from 'express'
import { compose } from 'ramda'
import middleware from './middleware'
import routes from './routes'


const setUp = compose(
    routes,
    middleware
)


export const app = setUp(express())
export default app
