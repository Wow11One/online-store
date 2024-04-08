import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Dropdown, Row} from "react-bootstrap";
import {fetchBrands, fetchTypes} from "../http/shoesApi";

const BrandBar = observer(() => {
    const {shoes} = useContext(Context)

    useEffect(() => {
        fetchBrands().then(data => shoes.setBrands(data))
        shoes.setSelectedBrand({})
    }, [])

    return (
        <Card
            className='p-3 mt-4 shadow-sm'
            style={{borderColor: 'white'}}
        >
            <div>
                Producer

                <Dropdown className='mt-3'>
                    <Dropdown.Toggle
                        variant={'outline-secondary'}
                        className='rounded'
                    >
                        {shoes.selectedBrand.name || 'any brand'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => shoes.setSelectedBrand({})}
                            key={-1}
                        >
                            any brand
                        </Dropdown.Item>
                        {shoes.brands.map(brand =>
                            <Dropdown.Item
                                onClick={() => shoes.setSelectedBrand(brand)}
                                key={brand.id}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Card>
    );
});

export default BrandBar;