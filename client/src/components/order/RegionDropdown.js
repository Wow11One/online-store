import React, {useContext, useEffect, useState} from 'react';
import {fetchRegions} from "../../http/orderApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import AddressDropdown from "./AddressDropdown";

const RegionDropdown = observer(() => {
    const {order} = useContext(Context)
    const [regions, setRegions] = useState([])
    useEffect(() => {
        fetchRegions().then(data => {
            setRegions(data)
            order.setPostAddress({...order.postAddress, postRegion: data[4]})
        })
    }, [])

    return (
        <AddressDropdown field={'postRegion'} data={regions}/>
    )
})

export default RegionDropdown