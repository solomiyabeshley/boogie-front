import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const addDeviceToCart = async (device) => {
    const {data} = await $host.post('api/cart', device)
    return data
}

export const fetchBasketDevices = async (cartId) => {
    const {data} = await $host.get('api/cart', {params: {
            cartId
        }})
    return data
}

export const deleteDevice = async (id) => {
    const {data} = await $host.delete('api/cart', {params: {
            id
        }})
    return data
}

export const changeCount = async (body) => {
    const {data} = await $host.put('api/cart/edit', body)
    return data
}