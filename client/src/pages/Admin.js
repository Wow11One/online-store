import React, {useContext, useState} from 'react';
import {Button, Col, Container, ListGroup, Row, Table} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AdminSections from "../components/admin/AdminSections";
import BrandSection from '../components/admin/BrandSection'
import TypeSection from "../components/admin/TypeSection";
import ShoesSection from "../components/admin/ShoesSection";

const Admin = observer(() => {
    const adminSections = ['Brands', 'Types', 'Shoes', 'Orders']
    const [section, setSection] = useState('Brands')
    const chooseSection = (section) => {
        setSection(section)
    }

    const renderSection = (section) => {
        switch (section) {
            case adminSections[0]:
                return <BrandSection/>
            case adminSections[1]:
                return <TypeSection/>
            case adminSections[2]:
                return <ShoesSection/>
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
                                active={section === sec}
                                key={sec}
                            />
                        )}
                    </ListGroup>
                </Col>
                <Col lg={9}>
                    {renderSection(section)}
                </Col>
            </Row>
        </Container>
    );
});

export default Admin;