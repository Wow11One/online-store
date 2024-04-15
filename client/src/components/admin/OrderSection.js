import React, {useContext} from 'react'
import SearchBar from '../SearchBar'
import {observer} from 'mobx-react-lite'
import {Context} from "../../index";
import OrderTable from "./OrderTable";
import OrderStateFilter from "./OrderStateFilter";

const OrderSection = observer(() => {
    const {order} = useContext(Context)
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <OrderStateFilter hasAny={true}/>
                <SearchBar context={order}/>
            </div>
            <div>
                <OrderTable/>
            </div>
        </div>
    )
})

export default OrderSection;