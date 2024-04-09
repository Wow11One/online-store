import {makeAutoObservable} from "mobx";

export default class ShoesStore {
    constructor() {
        this._shoesList = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        this._search = ''
        this._sortCriteria = []
        this._selectedSortCriterion = ''
        this._selectedSize = 0
        makeAutoObservable(this)
    }


    setSelectedType(type) {
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }


    setShoesList(shoesList) {
        this._shoesList = shoesList
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

    setSearch(search) {
        this._search = search;
    }

    setSortCriteria(value) {
        this._sortCriteria = value;
    }

    setSelectedSortCriterion(value) {
        this._selectedSortCriterion = value;
    }

    setSelectedSize(value) {
        this._selectedSize = value;
    }

    get selectedSize() {
        return this._selectedSize;
    }

    get sortCriteria() {
        return this._sortCriteria;
    }


    get selectedSortCriterion() {
        return this._selectedSortCriterion;
    }

    get search() {
        return this._search;
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

    get shoesList() {
        return this._shoesList
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