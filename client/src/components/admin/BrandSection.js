import React, {useContext, useEffect, useState} from 'react';
import {Button, Row} from "react-bootstrap";
import TypeBrandModal from "../modals/TypeBrandModal";
import {createBrand, deleteBrand, fetchBrands, fetchShoesList, updateBrand} from "../../http/shoesApi";
import BrandTypeTable from "./BrandTypeTable";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import SearchBar from "../SearchBar";

const BrandSection = observer(() => {
    const [modalVisible, setModalVisible] = useState(false)
    const {brand} = useContext(Context)


    useEffect(() => {
        fetchBrands(brand.search, 1, brand.limit).then(data => {
            brand.setBrands(data.rows)
            brand.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchBrands(
            brand.search,
            brand.page,
            brand.limit
        ).then(data => {
            brand.setBrands(data.rows)
            brand.setTotalCount(data.count)
            brand.setPage(brand.page)
        })
    }, [brand.page, brand.search, brand.totalCount])

    const add = (onHide, context) => {
        createBrand({name: context.selected.name})
            .then(data => {
                context.setPage(1)
                fetchBrands(brand.search, context.page, brand.limit)
                    .then(data => {
                        context.setBrands(data.rows)
                        brand.setTotalCount(data.count)
                        brand.setPage(brand.page)
                        context.setSelected({name: '', id: ''})
                    })
            })

        onHide()
    }

    const change = (onHide, context) => {
        updateBrand(context.selected).then(data => {
            context.setBrands(context.brands.map(item => {
                if (item.id === data.id) {
                    item.name = data.name
                }
                return item
            }))
        })
        context.setSelected({id: -2, name: ''})
        context.setSearch('')
        context.setPage(1)
        onHide()
    }

    const remove = (context, id) => {
        deleteBrand(id).then(data => {
            context.setBrands(context.brands.filter(brand => brand.id !== id))
            context.setTotalCount(context.totalCount - 1)
            if (context.brands.length === 0) {
                context.setPage(context.page - 1)
            }
        })
    }

    return (
        <Row>
            <Row
                className='d-flex flex-row justify-content-between align-items-center'
            >
                <Button
                    variant='outline-dark'
                    onClick={() => {
                        setModalVisible(true)
                        brand.setSelected({name: '', id: -2})
                    }}
                    style={{width: 'auto'}}
                >
                    Create brand
                </Button>
                <SearchBar context={brand}/>
            </Row>
            <BrandTypeTable
                data={{list: brand.brands}}
                updateAction={change}
                deleteAction={remove}
                context={brand}
            />
            <TypeBrandModal show={modalVisible}
                            onHide={() => setModalVisible(false)}
                            actionName='Create'
                            actionTarget='brand'
                            action={add}
                            context={brand}
            />
        </Row>
    )
})

export default BrandSection;