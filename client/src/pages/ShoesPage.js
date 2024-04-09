import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap"
import bigStar from '../assets/bigStar.png'
import {fetchOnePairOfShoes} from "../http/shoesApi";
import {SERVER_URL} from "../utils/consts";
import SizeList from "../components/SizeList";
import ShoesInfo from "../components/ShoesInfo";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const ShoesPage = observer(() => {
    const {shoes} = useContext(Context)
    const [currShoes, setCurrShoes] = useState({info: [], brand: {}, type: {}, sizes: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOnePairOfShoes(id).then(data => setCurrShoes(data))
    }, [])
    console.log(currShoes)
    return (
        <Container className='mt-4'>
            <Row>
                <Col md={5}>
                    <Image width={'100%'} height={500} src={SERVER_URL + currShoes.img}/>
                </Col>
                <Col md={7}>
                    <Row className='justify-content-between mt-4'>
                        <div style={{width: '50%'}}>
                            <h5 style={{fontWeight: 'normal', textTransform: 'uppercase'}}>
                                {currShoes.name}
                            </h5>
                            <div className='mt-3 details'>
                            <span>
                                Producer: {currShoes.brand.name}
                            </span>
                                <br/>
                                <span className='mt-0'>
                                Type: {currShoes.type.name}
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
                                {currShoes.price} HRN</p>
                        </Card>
                    </Row>
                    <SizeList sizeList={currShoes.sizes}/>

                    <Button
                        variant='dark'
                        style={{minWidth: 150, minHeight: 40, fontSize: 18}}
                        className='mt-5'
                        disabled={currShoes.sizes.length === 0 || shoes.selectedSize === 0}
                    >
                        Add to Bag
                    </Button>
                </Col>
            </Row>
            <ShoesInfo info={currShoes.info}/>
        </Container>
    );
});

export default ShoesPage;