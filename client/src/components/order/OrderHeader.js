import React from 'react';

const OrderHeader = ({text}) => {
    return (
        <div
            className='order-header'
        >
            <span>
                {text}
            </span>
        </div>
    );
};

export default OrderHeader;