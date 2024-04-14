import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchCities} from "../../http/orderApi";
import AddressDropdown from "./AddressDropdown";

const CityDropdown = observer(() => {
    const {order} = useContext(Context)
    const [cities, setCities] = useState([])
    useEffect(() => {
        if (order.postAddress.postRegion.id) {
            fetchCities(order.postAddress.postRegion.id).then(data => {
                setCities(data)
                order.setPostAddress({...order.postAddress, postCity: data[0]})
            })
        }
    }, [order.postAddress.postRegion])

    return (
        <AddressDropdown field={'postCity'} data={cities}/>
    )
})

export default CityDropdown;