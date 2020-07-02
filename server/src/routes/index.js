import express from 'express'
import apiRouter from './api'
import loginRouter from './login'


export default app => {
    const router = express.Router()
    router.use('/', apiRouter(app, router))
    router.use('/', loginRouter(app, router))

    // Register the root SPA route/view
    router.get('/', (req, res)=> res.render('index.html'))
    app.use(router)
    return app
}
