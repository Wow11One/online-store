import React, {useContext, useState} from 'react';
import {Button, Col, Container, ListGroup, Row, Table} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AdminSections from "../components/admin/AdminSections";
import BrandSection from '../components/admin/BrandSection'
import TypeSection from "../components/admin/TypeSection";
import ShoesSection from "../components/admin/ShoesSection";
import OrderSection from "../components/admin/OrderSection";
import {useNavigate, useParams} from "react-router-dom";
import {ADMIN_ROUTE} from "../utils/consts";

const Admin = observer(() => {
    const adminSections = ['brands', 'types', 'shoes', 'orders']
    const {id} = useParams()
    const navigate = useNavigate()
    const chooseSection = (section) => {
        navigate(ADMIN_ROUTE + '/' + section)
    }

    const renderSection = (section) => {
        switch (section) {
            case adminSections[0]:
                return <BrandSection/>
            case adminSections[1]:
                return <TypeSection/>
            case adminSections[2]:
                return <ShoesSection/>
            case adminSections[3]:
                return <OrderSection/>
        }
    }

    return (
        <Container className='d-flex flex-column'>
            <Row className='mt-3'>
                <Col md={3}>
                    <ListGroup className='shadow-sm'>
                        {adminSections.map(sec =>
                            <AdminSections
                                adminSection={sec}
                                onClick={() => chooseSection(sec)}
                                active={id === sec}
                                key={sec}
                            />
                        )}
                    </ListGroup>
                </Col>
                <Col lg={9}>
                    {renderSection(id)}
                </Col>
            </Row>
        </Container>
    );
});

export default Admin;