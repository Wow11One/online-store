import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap"
import {fetchOnePairOfShoes} from "../http/shoesApi";
import {ERROR_ROUTE, LOGIN_ROUTE, SERVER_URL} from "../utils/consts";
import SizeList from "../components/shoes/SizeList";
import ShoesInfo from "../components/shoes/ShoesInfo";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const ShoesPage = observer(() => {
    const {shoes, order, user} = useContext(Context)
    const [currShoes, setCurrShoes] = useState({info: [], brand: {}, type: {}, sizes: []})
    const {id} = useParams()
    const navigate = useNavigate()
    const addToBag = () => {
        if (!user.isAuth) {
            navigate(LOGIN_ROUTE)
            return
        }
        let basket = JSON.parse(localStorage.getItem('basket'))
        const index = basket.findIndex(e => e.id === shoes.selectedSize.id)

        if (index > -1) {
            basket[index].amount++
        } else {
            basket.push({
                id: shoes.selectedSize.id,
                shoesId: currShoes.id,
                amount: 1,
                name: currShoes.name,
                price: currShoes.price,
                image: currShoes.image,
                size: shoes.selectedSize.sizeValue
            })
        }
        console.log(basket)
        localStorage.setItem('basket', JSON.stringify(basket))
        order.setBasket(basket)
        alert('Shoes successfully added to basket')
    }
    useEffect(() => {
        fetchOnePairOfShoes(id)
            .then(data => setCurrShoes(data))
            .catch(err => navigate(ERROR_ROUTE, {state: {message: err.message}}))
    }, [])
    return (
        <Container className='mt-4'>
            <Row>
                <Col md={5}>
                    <Image width={'100%'} height={500} src={currShoes.image}/>
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
                                width: 200,
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
                        onClick={addToBag}
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