import {makeAutoObservable} from "mobx";

export default class TypeStore {
    constructor() {
        this._types = []
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        this._search = ''
        makeAutoObservable(this)
    }

    get types() {
        return this._types;
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

    setTypes(value) {
        this._types = value;
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