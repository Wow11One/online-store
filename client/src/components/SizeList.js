import React, {useState} from 'react';
import {Button, Row} from "react-bootstrap";

const SizeList = ({sizeList}) => {
    const [size, setSize] = useState('')

    return (
        <Row className='mt-lg-5 w-75'>
            <label
                className='mb-3'
                style={{fontWeight: 600, fontSize: 15}}
            >
                Sizes available. Delivery takes from 1 to 2 days
            </label>
            <Row className={}>
                {sizeList.map(size =>
                    <Button
                        style={{height: 'auto', width: 'auto'}}
                        variant='outline-dark'
                        className='m-1'
                        key={Number(size.sizeValue)}
                    >
                        {size.sizeValue}
                    </Button>)}
            </Row>
        </Row>
    );
};

export default SizeList;