import React, {useContext, useEffect} from 'react';
import {Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {
    ORDER_STATUS_ANY,
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_COMPLETED,
    ORDER_STATUS_IN_PROCESS, ORDER_STATUS_NEW
} from "../../utils/consts";

const OrderStateFilter = observer(({hasAny}) => {
    const {order} = useContext(Context)
    const states = [
        ORDER_STATUS_CANCELLED,
        ORDER_STATUS_COMPLETED,
        ORDER_STATUS_IN_PROCESS,
        ORDER_STATUS_NEW
    ]
    if (hasAny) {
        states.push(ORDER_STATUS_ANY)
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant={'secondary'}>
                {order.state || 'Any state'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {states.map(status =>
                    <Dropdown.Item
                        onClick={() => order.setState(status)}
                        key={status}
                    >
                        {status || 'Any state'}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
})

export default OrderStateFilter;