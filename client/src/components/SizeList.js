import React, {useContext, useState} from 'react';
import {Button, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const SizeList = observer(({sizeList}) => {
    const {shoes} = useContext(Context)

    return (
        <Row className='mt-lg-5 w-75'>
            <label
                className='mb-3'
                style={{fontWeight: 600, fontSize: 15}}
            >
                {sizeList.length === 0
                    ? 'Unfortunately, there is no more sizes'
                    : 'Sizes available. Delivery takes from 1 to 2 days'}
            </label>
            <Row style={{paddingLeft: 19}}>
                {sizeList.map(size =>
                    <Button
                        style={{height: 'auto', width: 'auto'}}
                        variant='outline-dark'
                        className='m-1'
                        active={shoes.selectedSize === size.sizeValue}
                        onClick={() => shoes.setSelectedSize(size.sizeValue)}
                        key={Number(size.sizeValue)}
                    >
                        {size.sizeValue}
                    </Button>)}
            </Row>
        </Row>
    );
});

export default SizeList;