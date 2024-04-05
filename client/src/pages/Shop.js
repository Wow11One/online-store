import React, {useContext, useEffect} from 'react';
import {Col, Container, DropdownButton, Row, Dropdown} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";
import Pages from "../components/Pages";
import SortSearchBar from "../components/SortSearchBar";

const Shop = observer(() => {
    const {device} = useContext(Context)
    const pageLimit = 2
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(undefined, undefined, 1, pageLimit).then(data => {
            device.setLimit(pageLimit)
            device.setDevices(data.rows)
            device.setTotalCount(data.count)

        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, pageLimit).then(data => {
            device.setLimit(pageLimit)
            device.setDevices(data.rows)
            device.setTotalCount(data.count)

        })
    }, [device.page, device.selectedType, device.selectedBrand])

    return (
        <Container>
            <Row className='mt-3'>
                <Col md={3}>
                    <TypeBar/>
                    <BrandBar/>
                </Col>
                <Col lg={9}>
                    <SortSearchBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;