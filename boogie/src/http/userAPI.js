import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, firstname, surname) => {
    const {data} = await $host.post('api/user/registration', {email, password, role:null, firstname, surname })
    localStorage.setItem('token', data.token)
    console.log(data)
    return {token: jwt_decode(data.token) , userData: data.user}
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    console.log(data)

    return {token: jwt_decode(data.token) , userData: data.data.user, basketId: data.data.basketId}
}




export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    console.log(data)

    return  {token: jwt_decode(data.token) , userData: data.data.user, basketId: data.data.basketId}
}

export const editUser = async (obj) => {
    const {data} = await $host.put('api/user/edit', {obj} )
    console.log(data)

    return  {userData: data.user}
}