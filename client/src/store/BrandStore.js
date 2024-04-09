import {makeAutoObservable} from "mobx";

export default class BrandStore {
    constructor() {
        this._brands = []
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        this._search = ''
        this._selected = {name: '', id: -1}
        makeAutoObservable(this)
    }

    get brands() {
        return this._brands;
    }

    get page() {
        return this._page;
    }

    get totalCount() {
        return this._totalCount;
    }

    get limit() {
        return this._limit;
    }

    get search() {
        return this._search;
    }


    get selected() {
        return this._selected;
    }

    setSelected(value) {
        this._selected = value;
    }

    setBrands(value) {
        this._brands = value;
    }

    setPage(value) {
        this._page = value;
    }

    setTotalCount(value) {
        this._totalCount = value;
    }

    setLimit(value) {
        this._limit = value;
    }

    setSearch(value) {
        this._search = value;
    }
}