import {$authHost, $host} from './index'
import {jwtDecode} from 'jwt-decode'

export const createType = async (type) => {
    const {data} = await $authHost.post('api/types', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/types')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/types', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brands')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/shoes', device)
    return data
}

export const fetchOnePairOfShoes = async (id) => {
    const {data} = await $host.get('api/shoes/' + id)
    return data
}

export const fetchShoesList = async (typeId, brandId, page, limit = 5, search, order) => {
    const {data} = await $host.get('api/shoes', {
        params: {
            typeId, brandId, page, limit, search, order
        }
    })
    return data
}

export const fetchSortCriteria = async () => {
    const {data} = await $host.get('api/shoes/sort-criteria' )
    return data
}
