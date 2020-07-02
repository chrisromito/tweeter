import { Router } from 'express'
import { apiPaths } from '../endpoints'
import PostApi from 'controllers/api/post'


export default (app, parentRouter) => {
    const apiRouter = Router()
    apiRouter.get(apiPaths.post, PostApi.list)
    apiRouter.get(apiPaths.postDetail, PostApi.detail)
    apiRouter.post(apiPaths.post, PostApi.create)
    apiRouter.patch(apiPaths.postDetail, PostApi.update)
    apiRouter.delete(apiPaths.postDetail, PostApi.destroy)
    // FIXME: Register controllers here
    return apiRouter
}

