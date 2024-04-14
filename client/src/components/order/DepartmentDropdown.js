import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchDepartments} from "../../http/orderApi";
import AddressDropdown from "./AddressDropdown";

const DepartmentDropdown = observer(() => {
    const {order} = useContext(Context)
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        if (order.postAddress.postRegion.id) {
            fetchDepartments(order.postAddress.postCity.id).then(data => {
                setDepartments(data)
                order.setPostAddress({...order.postAddress, postDepartment: data[0]})
            })
        }
    }, [order.postAddress.postCity])

    return (
        <AddressDropdown field={'postDepartment'} data={departments}/>
    )
})

export default DepartmentDropdown;