import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import OrderUserData from "../components/order/OrderUserData";
import OrderDeliveryOption from "../components/order/OrderDeliveryOption";
import PaymentOption from "../components/order/PaymentOption";
import Basket from "../components/order/Basket";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {
    DELIVERY_TYPE_NOVA_POST,
    ORDER_PAGE_TYPE_CREATE,
    ORDER_PAGE_TYPE_READONLY,
    ORDER_PAGE_TYPE_UPDATE
} from "../utils/consts";
import basket from "../components/order/Basket";
import {
    createOrder,
    fetchOneCity,
    fetchOneDepartment,
    fetchOneOrder,
    fetchOneRegion,
    updateOrder
} from "../http/orderApi";
import {useLocation, useParams} from "react-router-dom";
import {check} from "../http/userApi";
import data from "bootstrap/js/src/dom/data";
import OrderStateFilter from "../components/admin/OrderStateFilter";

const OrderPage = observer(() => {
    const {order, user} = useContext(Context)
    const [validated, setValidated] = useState(false)
    const {id} = useParams()
    const {state} = useLocation()
    const [field, setField] = useState([])
    if (state) {
        order.setPageType(state.type)
    }
    if (window.location.pathname.includes('update')) {
        order.setPageType(ORDER_PAGE_TYPE_UPDATE)
    }
    const pageSetUp = () => {
        if (order.pageType === ORDER_PAGE_TYPE_UPDATE || order.pageType === ORDER_PAGE_TYPE_READONLY) {
            fetchOneOrder(id)
                .then(data => {
                    console.log(data)
                    order.setEmail(data.user.email)
                    order.setFirstName(data.userName)
                    order.setSurname(data.userSurname)
                    order.setComment(data.comment)
                    order.setPaymentType(data.paymentType)
                    order.setDeliveryType(data.deliveryType)
                    order.setState(data.state)
                    if (data.deliveryType === DELIVERY_TYPE_NOVA_POST) {
                        fetchOneRegion(data.postRegion)
                            .then(data => order.setPostAddress({...order.postAddress, postRegion: data}))
                        fetchOneCity(data.postCity)
                            .then(data => order.setPostAddress({...order.postAddress, postCity: data}))
                        fetchOneDepartment(data.postDepartment)
                            .then(data => order.setPostAddress({...order.postAddress, postDepartment: data}))
                    } else {
                        order.setCourierAddress(data.address)
                    }
                    const basket = data.order_shoes_sizes.map(item => {
                        let order = {
                            id: item.shoesSizeId,
                            amount: item.amount,
                            size: item.shoes_size.sizeValue,
                            name: item.shoes_size.sho.name,
                            price: item.shoes_size.sho.price,
                            img: item.shoes_size.sho.img,
                            shoesId: item.shoes_size.sho.id
                        }
                        return order
                    })
                    order.setBasket(basket)
                })
        } else {
            order.reset()
            check().then(data => {
                order.setEmail(data.email)
            })
        }
    }

    useEffect(() => {
        pageSetUp()
    }, [])

    useEffect(() => {
        pageSetUp()
    }, [order.pageType])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        if (form.checkValidity() === false || order.basket.length === 0) {
            event.stopPropagation()
            setValidated(true)
            alert('not correct data')
        } else {
            const formData = new FormData()
            formData.set('id', id)
            formData.set('userId', user.user.id)
            formData.set('userName', order.firstName)
            formData.set('userSurname', order.surname)
            formData.set('comment', order.comment)
            formData.set('deliveryType', order.deliveryType)
            let address = order.deliveryType === DELIVERY_TYPE_NOVA_POST
                ? {
                    postRegion: order.postAddress.postRegion.id,
                    postCity: order.postAddress.postCity.id,
                    postDepartment: order.postAddress.postDepartment.id
                }
                : {address: order.courierAddress}
            formData.set('address', JSON.stringify(address))
            formData.set('paymentType', order.paymentType)
            formData.set('state', order.state)
            formData.set('basket', JSON.stringify(order.basket))

            if (order.pageType === ORDER_PAGE_TYPE_CREATE) {
                createOrder(formData).then(data => alert('order is created')).catch(err => alert(err))
                order.setBasket([])
                localStorage.setItem('basket', JSON.stringify([]))
            } else {
                updateOrder(formData).then(data => alert('order is changed')).catch(err => alert(err))
            }
            setValidated(false)
        }
    }

    return (
        <Container>
            <h3 className='m-3'>
                {order.pageType === ORDER_PAGE_TYPE_CREATE ? 'Create order' : 'Info about order #' + id}
            </h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <fieldset disabled={order.pageType === ORDER_PAGE_TYPE_READONLY}>
                    <div className='d-flex flex-row justify-content-between'>
                        <Col md={6} className='m-3'>
                            <OrderUserData/>
                            <OrderDeliveryOption/>
                        </Col>
                        <Col md={6} className='m-3'>
                            <PaymentOption/>
                            <Basket/>
                            <div style={{
                                visibility: order.pageType === ORDER_PAGE_TYPE_UPDATE
                                    ? 'visible'
                                    : 'hidden'
                            }}>
                                <OrderStateFilter hasAny={false}/>
                            </div>
                        </Col>
                    </div>
                    <div>
                        <Col className='d-flex flex-row justify-content-end mb-4'>
                            <Button
                                variant={'dark'}
                                type={'submit'}
                                style={{
                                    fontSize: 19,
                                    visibility: order.pageType !== ORDER_PAGE_TYPE_READONLY
                                        ? 'visible'
                                        : 'hidden'
                                }}
                            >
                                {order.pageType === ORDER_PAGE_TYPE_CREATE ? 'Create' : 'Update'} order
                            </Button>
                        </Col>
                    </div>
                </fieldset>
            </Form>
        </Container>
    );
})

export default OrderPage;