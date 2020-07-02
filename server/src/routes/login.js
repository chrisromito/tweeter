import { Router } from 'express'
import { loginPaths } from './endpoints'
import { User } from 'models/user/models'

// FIXME: Build out an actual login workflow here
//     Just making this return a list of users for now =)
export default (app, parentRouter) => {
    const loginRouter = Router()
    loginRouter.get(loginPaths.login, (req, res)=>
        User.all()
            .then(users => res.send(users))
            .catch(()=> res.sendStatus(500))
    )
    return loginRouter
}
