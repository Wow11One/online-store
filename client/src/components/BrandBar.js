import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className='d-inline-flex'>
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className='p-3'
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    style={{width: 'auto', cursor: 'pointer'}}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;