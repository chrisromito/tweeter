export const BAD_REQUEST = {
    status: 400,
    description: `Bad request due to invalid payload  L(°O°L)`
}

export const UNAUTHORIZED = {
    status: 401,
    description: `Insufficient authorization level ಠ╭╮ಠ`
}

export const UNAUTHENTICATED = {
    status: 403,
    description: `Invalid or stale credentials ಠ_ಠ`
}

export const NOT_FOUND = {
    status: 404,
    description: `Unknown URL ¯\\_(ツ)_/¯`,
    template: '404_view.html'
}

export const statusCodes = {
    BAD_REQUEST,
    UNAUTHORIZED,
    UNAUTHENTICATED,
    NOT_FOUND
}

export default statusCodes
