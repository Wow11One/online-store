import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE, SERVER_URL} from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className='mt-3' style={{width: 150, cursor: 'pointer'}}>
                <Image width={140} height={150} src={SERVER_URL + device.img}
                       style={{position: 'relative', left: 2, top: 3}}/>
                <div className='mt-1 d-flex justify-content-between align-items-center'>
                    <div className='text-black-50'>
                        Samsung
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image width={13} height={13} src={star}/>
                    </div>
                </div>
                <div>
                    {device.name}
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;