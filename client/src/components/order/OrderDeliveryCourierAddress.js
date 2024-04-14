import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {Dropdown, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const OrderDeliveryCourierAddress = observer(() => {
    const {order} = useContext(Context)

    useEffect(() => {

    }, [])

    return (
        <Row className='mt-2'>
            <div>
                <Form.Group
                    className="mt-2 d-flex flex-row justify-content-between align-items-center"
                >
                    <div>
                        <Form.Label>
                            Address
                        </Form.Label>
                    </div>
                    <div>
                        <Form.Control
                            placeholder="Kyiv, str. Peremogy, 22"
                            value={order.courierAddress}
                            title='Enter the address you want your shoes delivered'
                            onChange={e => order.setCourierAddress(e.target.value)}
                            style={{width: 350}}
                        />
                    </div>
                </Form.Group>
            </div>
        </Row>
    )
})

export default OrderDeliveryCourierAddress;