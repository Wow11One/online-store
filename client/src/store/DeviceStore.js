import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 2
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

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setLimit(value) {
        this._limit = value;
    }

    get limit() {
        return this._limit;
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
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
        this.setPage(1)
        return this._selectedType
    }

    get selectedBrand() {
        this.setPage(1)
        return this._selectedBrand
    }
}