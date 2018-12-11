import Vue from 'vue'
import VueRessource from 'vue-resource'
import root from 'window-or-global'
import {X_ACCESS_TOKEN, X_CORRELATION_ID} from "../const/headers"
import state from '../store/state'
import {isNil} from '../services/calculations'

Vue.use(VueRessource)

Vue.http.options.root = root.location ? root.location.origin : 'tests/'

/**
 *
 * @param param => '_ids'
 * @param values => [1,2,3]
 * @returns "_ids=1&_ids=2&_ids=3"
 */
export const arrayOf = (param, values) => {
    const arr = []
    for (let i = 0; i < values.length; i++) {
        arr.push(`${param}=${encodeURIComponent(values[i])}`)
    }
    return arr.join("&")
}

export const paramsOf = params => {
    const keys = Object.keys(params)
    const arr = []
    for (let i = 0; i < keys.length; i++) {
        const rawValue = params[keys[i]]
        if (!isNil(rawValue)) {
            arr.push(Array.isArray(rawValue) ? arrayOf(keys[i], rawValue) : `${keys[i]}=${encodeURIComponent(rawValue)}`)
        }
    }
    return arr.length > 0 ? "?" + arr.join("&") : ""
}

const token = () => state.token && {[X_ACCESS_TOKEN]: state.token} || {}
const correlationId = () => state.correlationId && {[X_CORRELATION_ID]: state.correlationId} || {}

export const get = async (url, reqOpts) => (await Vue.http.get(url, {json: true, headers: {...correlationId()}, ...reqOpts})).body
export const del = (url, reqOpts) => Vue.http.delete(url, {json: true, headers: {...token(), ...correlationId()}, ...reqOpts})
export const post = (url, body, reqOpts) => Vue.http.post(url, body, {json: true, headers: {...token(), ...correlationId()}, ...reqOpts})
export const put = (url, body, reqOpts) => Vue.http.put(url, body, {json: true, headers: {...token(), ...correlationId()}, ...reqOpts})

export const upload = (url, formData, reqOpts) => {
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('POST', Vue.http.options.root + url, true)

    //Headers
    if (state.token) {
        xhr.setRequestHeader(X_ACCESS_TOKEN, state.token)
    }
    if (reqOpts && reqOpts.headers) {
        Object.keys(reqOpts.headers).forEach(p =>
            xhr.setRequestHeader(p, reqOpts.headers[p])
        )
    }

    // Events
    if (reqOpts && reqOpts.onProgress) {
        xhr.upload.addEventListener('progress', reqOpts.onProgress, false)
    }

    let promise = new Promise((resolve, reject) => {
        xhr.onload = function () {
            xhr.status >= 200 && xhr.status < 400 ? resolve(this.response) : reject(this.response)
        }
        xhr.onerror = event => reject("Une erreur " + event.target.status + " s'est produite")
    })

    // Start upload
    xhr.send(formData)
    return promise
}

