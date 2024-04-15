import React, {useContext} from 'react';
import {Context} from "../../index";
import OrderHeader from "./OrderHeader";
import {Form} from "react-bootstrap";
import {PAYMENT_TYPE_ONLINE, PAYMENT_TYPE_UPON_RECEIPT} from "../../utils/consts";
import {observer} from "mobx-react-lite";

const PaymentOption = observer(() => {
    const {order} = useContext(Context)

    return (
        <div>
            <OrderHeader text={'Payment type'}/>
            <div className='mt-3 p-2'>
                <div className='mb-3'>
                    <Form.Check
                        type={'radio'}
                        label={'Pay online'}
                        name='payment_group'
                        checked={PAYMENT_TYPE_ONLINE === order.paymentType}
                        onClick={() => order.setPaymentType(PAYMENT_TYPE_ONLINE)}
                    />

                    <Form.Check
                        type={'radio'}
                        label={'Pay upon receipt'}
                        className='mt-1'
                        name='payment_group'
                        checked={PAYMENT_TYPE_UPON_RECEIPT === order.paymentType}
                        onClick={() => order.setPaymentType(PAYMENT_TYPE_UPON_RECEIPT)}
                    />
                </div>
            </div>
        </div>
    )
})

export default PaymentOption