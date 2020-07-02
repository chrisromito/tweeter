import { URL } from 'url'
import { compile } from 'path-to-regexp'
import { curry, prop } from 'ramda'
import {
    SITE_URL,
    LOGIN_URL
} from '../constants'




//-- Api URL paths
export const apiRoot = '/api'


export const apiPaths = {
    root: apiRoot,
    post: `${apiRoot}/post`,
    postDetail: `${apiRoot}/post/:id`
}


//-- Login URL paths
export const loginRoot = LOGIN_URL
export const loginPaths = {
    root: loginRoot,
    login: loginRoot
}


export const endpoints = {
    ...apiPaths,
    ...loginPaths,
    root: '/'
}


/**
 * @func reverse_ - Convert an Express URL path to a legit URL
 * with the params populated based on the provided kwargs
 * Inspired by Django's 'reverse' function:
 * {@link https://docs.djangoproject.com/en/dev/ref/urlresolvers/#reverse}
 *
 * @param {String} url
 * @param {Object} kwargs
 * @returns {string}
 * @private
 */
const reverse_ = (url, kwargs) => {
    const compiler = compile(url, {
        encode: encodeURIComponent,
        decode: decodeURIComponent
    })

    return compiler(kwargs)
}

/**
 * @func reverse - Curried function to populate the params of
 * an Express URL path with the given kwargs
 * @param {String} url
 * @param {Object} kwargs
 * @param {Object|null} queryParams - Additional search/query params
 * @returns {String}
 *
 * @see reverse_
 * @example
 * > const myApiPath = '/my_api/:my_key/:id'
 * > const myUrl = reverse(myApiPath, { my_key: 'my_value', id: 123 })
 * > console.log(myUrl)
 * ... '/my_api/my_value/123'
 */
export const reverse = curry(reverse_)

/**
 * @func reverseAbsolute - Absolute version of `reverse`
 * @see{reverse}
 * @param url
 * @param kwargs
 * @param {Object|null} queryParams
 * @returns {String}
 */
export const reverseAbsolute = (url, kwargs, queryParams = null) =>
    liftPath(
        SITE_URL,
        reverse(url, kwargs),
        queryParams
    )


/**
 * @func liftPath
 * @param {String} domain
 * @param {String} path
 * @param {Object|null} [queryParams=null]
 * @returns {String}
 */
const liftPath = (domain, path, queryParams = null) => {
    const url = new URL(domain)
    url.pathname = path
    if (queryParams) {
        for (let k in queryParams) {
            url.searchParams.set(k, prop(k, queryParams))
        }
    }
    return url.toString()
}
