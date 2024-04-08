import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap"
import bigStar from '../assets/bigStar.png'
import {fetchOnePairOfShoes} from "../http/shoesApi";
import {SERVER_URL} from "../utils/consts";
import SizeList from "../components/SizeList";


const ShoesPage = () => {
    const [shoes, setShoes] = useState({info: [], brand: {}, type: {}, sizes: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOnePairOfShoes(id).then(data => setShoes(data))
    }, [])
    console.log(shoes)
    return (
        <Container className='mt-4'>
            <Row>
                <Col md={5}>
                    <Image width={'90%'} height={500} src={SERVER_URL + shoes.img}/>
                </Col>
                <Col md={7}>
                    <Row className='justify-content-between mt-4'>
                        <div style={{width: '50%'}}>
                            <h5 style={{fontWeight: 'normal', textTransform: 'uppercase'}}>
                                {shoes.name}
                            </h5>
                            <div className='mt-3 details'>
                            <span>
                                Producer: {shoes.brand.name}
                            </span>
                                <br/>
                                <span className='mt-0'>
                                Type: {shoes.type.name}
                            </span>
                            </div>
                        </div>
                        <Card
                            className='d-flex align-items-center shadow-sm'
                            style={{
                                width: 180,
                                height: 80,
                                fontSize: 29,
                                border: 'none'
                            }}
                        >
                            <p
                                style={{
                                    width: 'auto',
                                    fontWeight: 'normal',
                                    marginTop: '10%'
                                }}
                            >
                                {shoes.price} HRN</p>
                        </Card>
                    </Row>
                    <SizeList sizeList={shoes.sizes}/>

                </Col>
            </Row>
            <Row className='d-flex flex-column mt-1'>
                <h4>Shoes info:</h4>
                {shoes.info.map((info, index) =>
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

export default ShoesPage;