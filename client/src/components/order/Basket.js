import React from 'react';
import OrderHeader from "./OrderHeader";
import BasketTable from "./BasketTable";

const Basket = () => {
    return (
        <div className='mt-3'>
            <OrderHeader text={'Basket'}/>
            <BasketTable/>
        </div>
    );
};

export default Basket;