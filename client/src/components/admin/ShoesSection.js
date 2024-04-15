import React, {useContext, useEffect, useState} from 'react';
import {Button, Row} from "react-bootstrap";
import SearchBar from "../SearchBar";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createShoes, deleteShoes, fetchShoesList, updateShoes} from "../../http/shoesApi";
import ShoesTable from "./ShoesTable";
import ShoesModal from "../modals/ShoesModal";

const ShoesSection = observer(() => {
    const {shoes} = useContext(Context)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
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
        fetchShoesList(undefined,
            undefined,
            shoes.page,
            shoes.limit,
            shoes.search,
            undefined).then(data => {
            shoes.setShoesList(data.rows)
            shoes.setTotalCount(data.count)
        })
    }, [shoes.page, shoes.search, shoes.totalCount])

    return (
        <Row>
            <Row
                className='d-flex flex-row justify-content-between align-items-center'
            >
                <Button
                    variant='outline-dark'
                    onClick={() => {
                        setModalVisible(true)
                        shoes.setSelected({
                            info: [],
                            sizes: [],
                            brand: {id: 0},
                            type: {id: 0},
                            name: '',
                            price: 0,
                            img: new File([1], 'empty.jpg')
                        })
                    }}
                    style={{width: 'auto'}}
                >
                    Create shoes
                </Button>
                <SearchBar context={shoes}/>
            </Row>
            <ShoesTable
                data={{list: shoes.shoesList}}
                context={shoes}
            />
            <ShoesModal show={modalVisible}
                        onHide={() => setModalVisible(false)}
                        actionName='Create'
                        actionTarget='type'
                        context={shoes}
            />
        </Row>
    )
})

export default ShoesSection;