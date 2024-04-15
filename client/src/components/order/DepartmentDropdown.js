import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchDepartments} from "../../http/orderApi";
import AddressDropdown from "./AddressDropdown";
import {ORDER_PAGE_TYPE_CREATE} from "../../utils/consts";

const DepartmentDropdown = observer(() => {
    const {order} = useContext(Context)
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        if (order.postAddress.postCity.id) {
            fetchDepartments(order.postAddress.postCity.id).then(data => {
                setDepartments(data)
                if (order.pageType === ORDER_PAGE_TYPE_CREATE) {
                    let department = data[0]
                    order.setPostAddress({...order.postAddress, postDepartment: department})
                }
            })
        }
    }, [])

    useEffect(() => {
        if (order.postAddress.postCity.id) {
            fetchDepartments(order.postAddress.postCity.id).then(data => {
                setDepartments(data)
                let department = data[0]
                order.setPostAddress({...order.postAddress, postDepartment: department})
            })
        }
    }, [order.postAddress.postCity, order.postAddress.postRegion])

    return (
        <AddressDropdown field={'postDepartment'} data={departments}/>
    )
})

export default DepartmentDropdown;