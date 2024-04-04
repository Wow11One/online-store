import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Холодильники'},
            {id: 2, name: 'Cмартфони'},
            {id: 3, name: 'Ноутбуки'},
            {id: 4, name: 'Планшети'},
            {id: 5, name: 'Роутери'}
        ]
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'},
            {id: 3, name: 'Lenovo'},
            {id: 4, name: 'Asus'},
            {id: 5, name: 'Xiaomi'}
        ]
        this._devices = [
            {
                id: 1,
                name: 'Iphone 15 pro',
                prices: 25000,
                rating: 5,
                img: `https://hotline.ua/img/tx/409/4093641605.jpg`
            },
            {
                id: 2,
                name: 'Iphone 15 pro',
                prices: 25000,
                rating: 5,
                img: `https://hotline.ua/img/tx/409/4093641605.jpg`
            },
            {
                id: 3,
                name: 'Iphone 15 pro',
                prices: 25000,
                rating: 5,
                img: `https://hotline.ua/img/tx/409/4093641605.jpg`
            },
            {
                id: 4,
                name: 'Iphone 15 pro',
                prices: 25000,
                rating: 5,
                img: `https://hotline.ua/img/tx/409/4093641605.jpg`
            },
            {
                id: 5,
                name: 'Iphone 15 pro',
                prices: 25000,
                rating: 5,
                img: `https://hotline.ua/img/tx/409/4093641605.jpg`
            }
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    get devices() {
        return this._devices
    }

    get brands() {
        return this._brands
    }

    get types() {
        return this._types
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }
}