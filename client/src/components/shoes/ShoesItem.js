import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {SHOES_ROUTE, SERVER_URL} from "../../utils/consts";

const ShoesItem = ({shoes}) => {
    const navigate = useNavigate()
    return (
        <Col
            style={{width: '30%'}}
            md={4}
            onClick={() => navigate(SHOES_ROUTE + '/' + shoes.id)}
        >
            <Card
                className='mt-3 rounded-0'
                style={{borderColor: 'white', cursor: 'pointer', minHeight: 340}}
            >
                <Image src={SERVER_URL + shoes.img}/>
                <div className='p-2'>
                    <div className='mt-1 d-flex justify-content-between align-items-center'>
                        <div className='text-black-50'>
                            {shoes.brand.name}
                        </div>
                    </div>
                    <div style={{fontSize: 12}}>
                        {shoes.name}
                    </div>
                    <div style={{fontSize: 12, fontWeight: 'bold'}}>
                        {shoes.price} hrn
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default ShoesItem;