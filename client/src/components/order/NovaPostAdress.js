import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import OrderHeader from "./OrderHeader";
import {Dropdown, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import RegionDropdown from "./RegionDropdown";
import CityDropdown from "./CityDropdown";
import DepartmentDropdown from "./DepartmentDropdown";

const OrderDeliveryNovaPostAddress = observer(() => {

    return (
        <div className='mt-3'>
            <OrderHeader text={'Delivery address'}/>
            <div className='p-2 mb-lg-5'>
                <Form.Group
                    className='mt-2 d-flex flex-row justify-content-between align-items-center'
                >
                    <div>
                        <Form.Label>
                            Region
                        </Form.Label>
                    </div>
                    <div>
                        <RegionDropdown/>
                    </div>
                </Form.Group>
                <Form.Group
                    className='mt-2 d-flex flex-row justify-content-between align-items-center'
                >
                    <div>
                        <Form.Label>
                            City
                        </Form.Label>
                    </div>
                    <div>
                        <CityDropdown/>
                    </div>
                </Form.Group>
                <Form.Group
                    className='mt-2 d-flex flex-row justify-content-between align-items-center'
                >
                    <div>
                        <Form.Label>
                            Department
                        </Form.Label>
                    </div>
                    <div>
                        <DepartmentDropdown/>
                    </div>
                </Form.Group>
            </div>
        </div>
    )
})

export default OrderDeliveryNovaPostAddress