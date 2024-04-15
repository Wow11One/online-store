import {$authHost} from "./index";

export const fetchRegions = async () => {
    const {data} = await $authHost.get('api/nova-post/regions')
    return data
}

export const fetchCities = async (regionId) => {
    const {data} = await $authHost.get('api/nova-post/cities', {
        params: {regionId}
    })
    return data
}

export const fetchDepartments = async (cityId) => {
    const {data} = await $authHost.get('api/nova-post/departments', {
        params: {cityId}
    })
    return data
}

export const fetchOneRegion = async (id) => {
    const {data} = await $authHost.get('api/nova-post/regions/' + id)
    return data
}

export const fetchOneCity = async (id) => {
    const {data} = await $authHost.get('api/nova-post/cities/' + id)
    return data
}

export const fetchOneDepartment = async (id) => {
    const {data} = await $authHost.get('api/nova-post/departments/' + id)
    return data
}

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/orders', order)
    return data
}

export const fetchOneOrder = async (id) => {
    const {data} = await $authHost.get('api/orders/' + id)
    return data
}

export const fetchAllOrders = async (limit, page, search, state) => {
    const {data} = await $authHost.get('api/orders', {
        params: {limit, page, search, state}
    })
    return data
}

export const updateOrder = async (order) => {
    const {data} = await $authHost.put('api/orders/' + order.get('id'), order)
    return data
}