import axios from 'axios'
let get = axios.create({
    baseURL: 'https://conduit.productionready.io',
    method: 'GET',
})
let post = axios.create({
    baseURL: 'https://conduit.productionready.io',
    method: 'POST',
})
let myget = async function (murl, mdata) {
    try {
        let { data } = await get({
            url: murl,
            data: mdata
        })
        return {
            ok: true,
            data: data
        }
    } catch (error) {
        return {
            ok: false,
            data: error.response.data.errors
        }
    }
}
let mypost = async function (murl, mdata) {
    try {
        let { data } = await post({
            url: murl,
            data: mdata
        })
        return {
            ok: true,
            data: data
        }
    } catch (error) {
        return {
            ok: false,
            data: error.response.data.errors
        }
    }
}
export {
    myget,
    mypost
}