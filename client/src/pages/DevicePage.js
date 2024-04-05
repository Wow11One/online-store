import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap"
import bigStar from '../assets/bigStar.png'
import {fetchOneDevice} from "../http/deviceApi";
import {SERVER_URL} from "../utils/consts";


const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    })
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={400} height={300} src={SERVER_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h3 style={{textAlign: 'center'}}>
                            {device.name}
                        </h3>
                        <div
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240, height: 240, backgroundSize: 'cover',
                                fontSize: 64
                            }}
                            className='d-flex justify-content-center align-items-center'
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3 style={{textAlign: 'center'}}>Price starts from: {device.price} hryvnias.</h3>
                        <Button variant={'outline-dark'}>Add to the basket</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h2>Device info:</h2>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{
                        background: index % 2 === 0 ? 'lightgray' : 'transparent',
                        padding: 10
                    }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;