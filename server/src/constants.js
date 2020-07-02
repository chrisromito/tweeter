import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { URL } from 'url'

dotenv.config()

export const {
    SITE_DOMAIN,
    SITE_URL,
    SECRET_KEY,
    JWT_SECRET,
    PORT
} = process.env

export const IS_DEV = process.env.NODE_ENV !== 'production'

export const ROOT_DIR = path.join(
    __dirname,
    '..',
    '..'
)


/**
 * URLS
 */

export const staticUrl = yourPath => `${SITE_URL}/static/${yourPath}`

export const LOGIN_URL = '/login'

