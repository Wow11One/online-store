import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchCities} from "../../http/orderApi";
import AddressDropdown from "./AddressDropdown";
import {ORDER_PAGE_TYPE_CREATE} from "../../utils/consts";

const CityDropdown = observer(() => {
    const {order} = useContext(Context)
    const [cities, setCities] = useState([])

    useEffect(() => {
        if (order.postAddress.postRegion.id) {
            fetchCities(order.postAddress.postRegion.id).then(data => {
                setCities(data)
                if (order.pageType === ORDER_PAGE_TYPE_CREATE) {
                    let city = data[0]
                    order.setPostAddress({...order.postAddress, postCity: city})
                }
            })
        }
    }, [])

    useEffect(() => {
        if (order.postAddress.postRegion.id) {
            fetchCities(order.postAddress.postRegion.id).then(data => {
                setCities(data)
                if (order.pageType === ORDER_PAGE_TYPE_CREATE) {
                    let city = data[0]
                    order.setPostAddress({...order.postAddress, postCity: city})
                }
            })
        }
    }, [order.postAddress.postRegion])

    return (
        <AddressDropdown field={'postCity'} data={cities}/>
    )
})

export default CityDropdown;