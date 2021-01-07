import axios from 'axios'

let query = null;
let token = '';
let queryUrl = '';

let fn = function (type) {
    let ax = axios.create({
        baseURL: 'https://conduit.productionready.io',
        method: type,
    })
    ax.interceptors.response.use(function (response) {
        return {
            ok: true,
            data: response.data
        }
    }, function (err) {
        console.log(err)
        return {
            ok: false,
            data: err.response.statusText
        }
        // return Promise.reject(error)
    })
    ax.interceptors.request.use(
        config => {
            if (token) {
                config.headers.Authorization = `Token ${token}`;
            }
            return config
        },
        err => {
            console.log(err)
            return {
                ok: false,
                data: err.response.statusText
            }
            // return Promise.reject(err)
        })
    return ax
}

export default ({ app, store }, inject) => {
    let { user } = store.state;
    if (user && user.token) {
        token = user.token
    }
    inject('post', fn('POST'))
    inject('get', fn('GET'))
    inject('Delete', fn('DELETE'))
}
