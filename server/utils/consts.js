const SORT_CRITERIA = ['price asc', 'price desc']

const ORDER_STATUS_NEW = 'new'
const ORDER_STATUS_IN_PROCESS = 'in process'
const ORDER_STATUS_COMPLETED = 'completed'
const ORDER_STATUS_CANCELLED = 'cancelled'

const PAYMENT_TYPE_UPON_RECEIPT = 'upon receipt'
const PAYMENT_TYPE_ONLINE = 'online'

const DELIVERY_TYPE_NOVA_POST = 'nova post'
const DELIVERY_TYPE_COURIER = 'courier'

const NOVA_POST_API_URL = 'https://api.novaposhta.ua/v2.0/json/'

module.exports = {
    SORT_CRITERIA,
    ORDER_STATUS_NEW,
    ORDER_STATUS_IN_PROCESS,
    ORDER_STATUS_COMPLETED,
    ORDER_STATUS_CANCELLED,
    PAYMENT_TYPE_UPON_RECEIPT,
    PAYMENT_TYPE_ONLINE,
    DELIVERY_TYPE_NOVA_POST,
    DELIVERY_TYPE_COURIER,
    NOVA_POST_API_URL
}