import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap"
import bigStar from '../assets/bigStar.png'

const DevicePage = () => {
    const device = {
        id: 1,
        name: 'Iphone 15 pro',
        price: 25000,
        rating: 5,
        img: `https://hotline.ua/img/tx/409/4093641605.jpg`
    }
    const deviceInfo = [
        {id: 1, title: `Random Access Memory`, description: '5 gb'},
        {id: 1, title: `Secondary memory`, description: '256 gb'},
        {id: 1, title: `Camera`, description: '12 px'},
        {id: 1, title: `Kernels`, description: '12'},
        {id: 1, title: `Accumulator`, description: '4000'}
    ]
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={400} height={300} src={device.img}/>
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2 style={{textAlign: 'center'}}>
                            {device.name}
                        </h2>
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
                {deviceInfo.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray': 'transparent',
                    padding:10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;