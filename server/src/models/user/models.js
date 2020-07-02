import { ASSOCIATE, extendModel } from '../base'



/**
 * @typedef {Object} user
 * @property {Number} id
 * @property {String} first_name
 * @property {String} last_name
 * @property {String} username
 * @property {String} email
 * @property {(String|null)} avatar
 * @property {Date} created
 * @property {(Date|null)} updated
 */

export const User = extendModel('app_user',
    model => ({
        all: ()=> ASSOCIATE`
            app_user
        `
    })
)
export default User
