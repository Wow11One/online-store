import React, {useContext} from 'react';
import OrderHeader from "./OrderHeader";
import {Form, Row} from "react-bootstrap";
import {Context} from "../../index";
import {DELIVERY_TYPE_COURIER, DELIVERY_TYPE_NOVA_POST} from "../../utils/consts";
import OrderDeliveryCourierAddress from "./OrderDeliveryCourierAddress";
import {observer} from "mobx-react-lite";
import OrderDeliveryNovaPostAddress from "./NovaPostAdress";

function PlainAddress() {
    return <div>hello)</div>;
}

const OrderDeliveryOption = observer(() => {
    const {order} = useContext(Context)

    return (
        <div className='mt-4'>
            <OrderHeader text={'Delivery type'}/>
            <div className='mt-3 p-2'>
                <div className='mb-3'>
                    <Form.Check
                        type={'radio'}
                        label={'Delivery by NOVA post'}
                        name='delivery_group'
                        checked={DELIVERY_TYPE_NOVA_POST === order.deliveryType}
                        onClick={() => order.setDeliveryType(DELIVERY_TYPE_NOVA_POST)}
                    />

                    <Form.Check
                        type={'radio'}
                        label={'Delivery by courier'}
                        className='mt-1'
                        name='delivery_group'
                        checked={DELIVERY_TYPE_COURIER === order.deliveryType}
                        onClick={() => order.setDeliveryType(DELIVERY_TYPE_COURIER)}
                    />
                </div>
            </div>
            {order.deliveryType === DELIVERY_TYPE_NOVA_POST
                ? <OrderDeliveryNovaPostAddress/>
                : <OrderDeliveryCourierAddress/>
            }
        </div>
    )
})

export default OrderDeliveryOption;