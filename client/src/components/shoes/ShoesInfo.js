import React from 'react';
import {Row} from "react-bootstrap";

const ShoesInfo = ({info}) => {
    if (info.length === 0){
        return <p></p>
    }
    return (
        <Row className='d-flex flex-column mt-1 info mb-3'>
            <h4
                style={{fontWeight: 'normal'}}
                className='ms-3'
            >
                Shoes info:</h4>
            <hr style={{width: '43%'}}/>
            {info.map((info) =>
                <Row key={info.id}
                     style={{width: '40%'}}
                     className='d-flex flex-row justify-content-between ms-3'
                >
                    <p style={{width: 'auto'}}>
                        {info.title}:
                    </p>
                    <p style={{width: 'auto'}}>
                        {info.description}
                    </p>
                </Row>
            )}
        </Row>
    );
};

export default ShoesInfo;