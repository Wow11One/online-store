import React, {useContext, useEffect, useState} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import OrderHeader from "./OrderHeader";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const OrderUserDataForm = observer(() => {
    const {order, user} = useContext(Context)
    return (
        <div>
            <OrderHeader text={'Contact data'}/>
            <div className='p-2'>
                <Form.Group
                    className='mt-2 d-flex flex-row justify-content-between align-items-center'
                    controlId='validationCustom01'
                >
                    <div>
                        <Form.Label>
                            Email
                        </Form.Label>
                    </div>
                    <div>
                        <Form.Control
                            required
                            disabled
                            value={order.email || user.user.email}
                            style={{width: 350}}
                        />
                    </div>
                </Form.Group>
                <Form.Group
                    className='mt-4 d-flex flex-row justify-content-between align-items-center'
                    controlId='validationCustom01'
                >
                    <div>
                        <Form.Label>
                            First Name
                        </Form.Label>
                    </div>
                    <div>
                        <Form.Control
                            required
                            value={order.firstName}
                            placeholder='Your name'
                            style={{width: 350}}
                            onChange={e => order.setFirstName(e.target.value)}
                        />
                        <Form.Control.Feedback type={'invalid'}>
                            First name can't be empty
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>
                <Form.Group
                    className='mt-4 d-flex flex-row justify-content-between align-items-center'
                    controlId='validationCustom02'
                >
                    <div>
                        <Form.Label>
                            Last Name
                        </Form.Label>
                    </div>
                    <div>
                        <Form.Control
                            placeholder='Your surname'
                            style={{width: 350}}
                            required
                            value={order.surname}
                            onChange={e => order.setSurname(e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Last name can't be empty
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>
                <Form.Control
                    className='mt-5'
                    as='textarea'
                    placeholder='Add your comment (optional)'
                    rows={4}
                    value={order.comment}
                    onChange={e => order.setComment(e.target.value)}
                />
            </div>
        </div>
    )
})

export default OrderUserDataForm;