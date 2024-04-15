import React, {useContext, useEffect, useState} from 'react';
import {fetchRegions} from "../../http/orderApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import AddressDropdown from "./AddressDropdown";
import {ORDER_PAGE_TYPE_CREATE, ORDER_PAGE_TYPE_READONLY} from "../../utils/consts";

const RegionDropdown = observer(() => {
    const {order} = useContext(Context)
    const [regions, setRegions] = useState([])

    useEffect(() => {
        fetchRegions().then(data => {
            setRegions(data)
            if (order.pageType === ORDER_PAGE_TYPE_CREATE) {
                let region = data[9]
                order.setPostAddress({...order.postAddress, postRegion: region})
            }
        })
    }, [])

    return (
        <AddressDropdown field={'postRegion'} data={regions}/>
    )
})

export default RegionDropdown