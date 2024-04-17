import React, {useContext} from 'react';
import {SORT_PRICE_ASC} from "../../utils/consts";
import {Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const OrderBar = observer(() => {
    const {shoes} = useContext(Context)

    const sort = (order) => {
        shoes.setSelectedSortCriterion(order)
        shoes.setPage(1)
    }

    return (
        <Dropdown title='Sort by'>
            <Dropdown.Toggle variant='outline-secondary'>
                {shoes.selectedSortCriterion === SORT_PRICE_ASC
                    ? 'From cheap to expensive'
                    : 'From expensive to cheap'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.ItemText style={{fontWeight: 'bold', fontSize: 14}}>
                    Sort criteria
                </Dropdown.ItemText>
                {shoes.sortCriteria.map(order =>
                    <Dropdown.Item
                        active={order === shoes.selectedSortCriterion}
                        onClick={() => sort(order)}
                        key={order}
                    >
                        {order === SORT_PRICE_ASC
                            ? 'From cheap to expensive'
                            : 'From expensive to cheap'}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
})

export default OrderBar;