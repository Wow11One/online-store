import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ShoesList from "../components/ShoesList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchShoesList, fetchSortCriteria, fetchTypes} from "../http/shoesApi";
import Pages from "../components/Pages";
import SearchBar from "../components/SearchBar";
import OrderBar from "../components/OrderBar";

const Shop = observer(() => {
    const {shoes, brand, type} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => type.setTypes(data.rows))
        fetchBrands().then(data => {
            brand.setBrands(data.rows)
            shoes.setSelectedBrand({})
        })
        fetchSortCriteria().then(data => {
            shoes.setSortCriteria(data)
            shoes.setSelectedSortCriterion(data[0] || '')
        })

        fetchShoesList(undefined,
            undefined,
            shoes.page,
            shoes.limit,
            '',
            shoes.selectedSortCriterion).then(data => {
            shoes.setShoesList(data.rows)
            shoes.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchShoesList(shoes.selectedType.id,
            shoes.selectedBrand.id,
            shoes.page,
            shoes.limit,
            shoes.search,
            shoes.selectedSortCriterion).then(data => {
            shoes.setShoesList(data.rows)
            shoes.setTotalCount(data.count)
        })
    }, [shoes.page, shoes.selectedType, shoes.selectedBrand, shoes.search, shoes.selectedSortCriterion])

    return (
        <Container>
            <Row className='mt-3'>
                <Col md={3}>
                    <TypeBar/>
                    <BrandBar/>
                </Col>
                <Col lg={9}>
                    <Row className='mt-1 d-flex justify-content-between'
                         style={{width: '92.5%'}}
                    >
                        <SearchBar context={shoes}/>
                        <OrderBar/>
                    </Row>

                    <ShoesList/>
                    <Pages context={shoes}/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;