import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import OrderUserData from "../components/order/OrderUserData";
import OrderDeliveryOption from "../components/order/OrderDeliveryOption";
import PaymentOption from "../components/order/PaymentOption";
import Basket from "../components/order/Basket";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {DELIVERY_TYPE_NOVA_POST} from "../utils/consts";
import basket from "../components/order/Basket";
import {createOrder} from "../http/orderApi";

const OrderPage = observer(() => {
    const {order, user} = useContext(Context)
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        if (order.pageType === 'readonly' || order.pageType === 'change') {

        }
    }, [])
    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        if (form.checkValidity() === false || order.basket.length === 0) {
            event.stopPropagation()
            setValidated(true)
            alert('not correct data')
        } else {
            const formData = new FormData()
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
            formData.set('basket', JSON.stringify(order.basket))
            localStorage.setItem('basket', JSON.stringify([]))
            order.setBasket([])
            createOrder(formData).then(data => alert('order is created')).catch(err => alert(err))
            setValidated(false)
        }
    }
    return (
        <Container>
            <h3 className='m-3'>Create order</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <fieldset disabled={order.pageType === 'readonly'}>
                    <div className='d-flex flex-row justify-content-between'>
                        <Col md={6} className='m-3'>
                            <OrderUserData/>
                            <OrderDeliveryOption/>
                        </Col>
                        <Col md={6} className='m-3'>
                            <PaymentOption/>
                            <Basket/>
                        </Col>
                    </div>
                    <div>
                        <Col className='d-flex flex-row justify-content-end mb-4'>
                            <Button
                                variant={'dark'}
                                style={{fontSize: 19}}
                                type={'submit'}
                            >
                                Create order
                            </Button>
                        </Col>
                    </div>
                </fieldset>
            </Form>
        </Container>
    );
})

export default OrderPage;