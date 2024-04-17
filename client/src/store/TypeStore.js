import {makeAutoObservable} from "mobx";

export default class TypeStore {
    constructor() {
        this._types = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        this._search = ''
        this._selected = {name: '', id: -1}
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


    get selected() {
        return this._selected;
    }

    setSelected(value) {
        this._selected = value;
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