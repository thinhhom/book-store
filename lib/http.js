import axios from 'axios'
// import { redirect } from 'next/navigation'
import envConfig from '@/config'
import { normalizePath } from '@/lib/utils'

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

class HttpError extends Error {
    constructor({ status, payload }) {
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}

class EntityError extends HttpError {
    constructor({ status, payload }) {
        super({ status, payload })
        this.status = status
        this.payload = payload
    }
}

class SessionToken {
    constructor(key) {
        this.key = key
    }

    get value() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.key) || ''
        }
        return ''
    }

    set value(token) {
        if (typeof window === 'undefined') {
            throw new Error('Cannot set token on server side')
        }
        localStorage.setItem(this.key, token)
    }

    clear() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.key)
        }
    }
}

export const clientSessionToken = new SessionToken('sessionTokenUser')
export const clientAdminSessionToken = new SessionToken('sessionTokenAdmin')

const isClient = () => typeof window !== 'undefined'

const request = async (method, url, options = {}) => {
    let body = undefined

    if (options?.body instanceof FormData) {
        body = options.body
    } else if (options?.body) {
        body = JSON.stringify(options.body)
    }

    const isAdminRequest = options?.type === 'admin'
    const sessionToken = isAdminRequest ? clientAdminSessionToken : clientSessionToken

    const baseHeaders = body instanceof FormData ? {} : { 'Content-Type': 'application/json' }

    if (isClient() && sessionToken.value) {
        baseHeaders.Authorization = `Bearer ${sessionToken.value}`
    }

    const baseUrl =
        options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

    try {
        const res = await axios({
            url: fullUrl,
            method: method,
            headers: {
                ...baseHeaders,
                ...options?.headers
            },
            data: body
        })

        const payload = res.data
        const data = { status: res.status, payload }

        // Xử lý các lỗi HTTP
        if (res.status !== 200) {
            if (res.status === ENTITY_ERROR_STATUS) {
                throw new EntityError({ status: ENTITY_ERROR_STATUS, payload })
            } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
                throw new HttpError({
                    status: AUTHENTICATION_ERROR_STATUS,
                    payload: { message: 'Authentication error. Please login again.' }
                })
            } else {
                throw new HttpError(data)
            }
        }

        if (isClient()) {
            if (
                ['auth/login', 'auth/register', 'auth/admin/login'].some(
                    (item) => item === normalizePath(url)
                )
            ) {
                const { token } = payload.data
                sessionToken.value = token
            } else if (normalizePath(url) === 'auth/logout') {
                sessionToken.clear()
            }
        }

        return data
    } catch (error) {
        if (error.response) {
            // Axios trả về lỗi qua response
            throw new HttpError({
                status: error.response.status,
                payload: error.response.data
            })
        } else {
            // Xử lý lỗi khác (như lỗi mạng)
            throw new HttpError({
                status: 500,
                payload: { message: 'An unexpected error occurred' }
            })
        }
    }
}

const http = {
    get(url, options) {
        return request('GET', url, options)
    },
    post(url, body, options) {
        return request('POST', url, { ...options, body })
    },
    put(url, body, options) {
        return request('PUT', url, { ...options, body })
    },
    delete(url, options) {
        return request('DELETE', url, options)
    }
}

export default http
