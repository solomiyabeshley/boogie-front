import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand , )
    return data
}

export const fetchBrands = async (typeId) => {
    const {data} = await $host.get('api/brand',{params: {
        typeId
        }} )
    return data
}

export const createDevice = async (device) => {
    console.log(device)
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const updateDevice = async (device, id) => {
    console.log(device)
    const {data} = await $authHost.put('api/device/' + id, device)
    return data
}
export const addFiles = async (files) => {
    const {data} = await $authHost.post('api/device/files', files)
    console.log(data)
    return data
}
export const deleteFiles = async (files) => {
    console.log(files)
    let path = ''
    if (files?.data.length){
        path = '?'
    }
    files?.data.map((res, index) => {
        if (files.length === index + 1) {
            path += `id${index}=${res}`
        }else {
            path += `id${index}=${res}&`
        }
    })
    if (files?.deviceId){
        path += `&deviceId=${files?.deviceId}`
    }
    const {data} = await $authHost.delete('api/device/files/' + path)
    return data
}


export const fetchDevices = async (typeId, brandId, page, limit= 5, userId) => {
    console.log(userId)
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit, userId
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}


