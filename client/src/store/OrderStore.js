import {makeAutoObservable} from "mobx";
import {DELIVERY_TYPE_NOVA_POST, ORDER_PAGE_TYPE_CREATE, PAYMENT_TYPE_UPON_RECEIPT} from "../utils/consts";

export default class OrderStore {
    constructor() {
        this._orders = []
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        this._search = ''
        this.reset()
        this._email = ''
        this._state = ''
        this._postAddress = {
            postDepartment: {id: '', name: ''},
            postCity: {id: '', name: ''},
            postRegion: {id: '', name: ''}
        }
        makeAutoObservable(this)
    }

    get orders() {
        return this._orders;
    }

    get totalPrice() {
        let totalPrice = 0
        this.basket.forEach(item => totalPrice += item.amount * item.price)

        return totalPrice;
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

    get firstName() {
        return this._firstName;
    }

    get surname() {
        return this._surname;
    }

    get email() {
        return this._email;
    }

    get comment() {
        return this._comment;
    }

    get paymentType() {
        return this._paymentType;
    }

    get deliveryType() {
        return this._deliveryType;
    }

    get postAddress() {
        return this._postAddress;
    }

    get basket() {
        return this._basket
    }

    get courierAddress() {
        return this._courierAddress;
    }


    get pageType() {
        return this._pageType;
    }


    get state() {
        return this._state;
    }

    setState(value) {
        this._state = value;
    }

    setPageType(value) {
        this._pageType = value;
    }

    setOrders(value) {
        this._orders = value;
    }

    setCourierAddress(value) {
        this._courierAddress = value;
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

    setFirstName(value) {
        this._firstName = value;
    }

    setSurname(value) {
        this._surname = value;
    }

    setEmail(value) {
        this._email = value;
    }

    setComment(value) {
        this._comment = value;
    }

    setPaymentType(value) {
        this._paymentType = value;
    }

    setDeliveryType(value) {
        this._deliveryType = value;
    }

    setPostAddress(value) {
        this._postAddress = value;
    }

    setBasket(value) {
        this._basket = value
    }

    reset() {
        this._firstName = ''
        this._surname = ''
        this._comment = ''
        this._state = ''
        this._basket = JSON.parse(localStorage.getItem('basket'))
        this._paymentType = PAYMENT_TYPE_UPON_RECEIPT
        this._deliveryType = DELIVERY_TYPE_NOVA_POST
        this._courierAddress = ''
        this._pageType = ORDER_PAGE_TYPE_CREATE
    }
}