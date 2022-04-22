import {API_URL} from './constants' 
var token;
if(typeof window !== "undefined") {
    token = document?.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
}

const ajax = {
    get: ({url = API_URL, path, headers, body}) => {

        return new Promise((resolve, reject) => {
            fetch(`${url}${path}`).then(res => res.json()).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })

    },
    post: ({url = API_URL, path, headers, body}) => {
        console.log(">>>> post call with token::", {token})
        return new Promise((resolve, reject) => {
            fetch(`${url}${path}`, {
                credentials: 'same-origin',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-xsrf-token': token,
                    ...headers
                },
                body: JSON.stringify({...body})
            }).then(res => res.json()).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default ajax;