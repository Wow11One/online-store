import React, {useContext, useEffect, useState} from 'react';
import {Button, Row} from "react-bootstrap";
import TypeBrandModal from "../modals/TypeBrandModal";
import {createType, deleteType, fetchTypes, updateType} from "../../http/shoesApi";
import BrandTypeTable from "./BrandTypeTable";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import SearchBar from "../shared/SearchBar";

const TypeSection = observer(() => {
    const [modalVisible, setModalVisible] = useState(false)
    const {type} = useContext(Context)


    useEffect(() => {
        fetchTypes(type.search, 1, type.limit).then(data => {
            type.setTypes(data.rows)
            type.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchTypes(
            type.search,
            type.page,
            type.limit
        ).then(data => {
            type.setTypes(data.rows)
            type.setTotalCount(data.count)
            type.setPage(type.page)
        })
    }, [type.page, type.search, type.totalCount])

    const add = (onHide, context) => {
        createType({name: context.selected.name})
            .then(data => {
                context.setPage(1)
                fetchTypes(type.search, context.page, type.limit)
                    .then(data => {
                        context.setTypes(data.rows)
                        type.setTotalCount(data.count)
                        type.setPage(type.page)
                        context.setSelected({name: '', id: ''})
                    })
            }).catch(err => alert(err))

        onHide()
    }

    const change = (onHide, context) => {
        updateType(context.selected).then(data => {
            context.setTypes(context.types.map(item => {
                if (item.id === data.id) {
                    item.name = data.name
                }
                return item
            }))
        }).catch(err => alert(err))
        context.setSelected({id: -2, name: ''})
        context.setSearch('')
        context.setPage(1)
        onHide()
    }

    const remove = (context, id) => {
        deleteType(id).then(data => {
            context.setTypes(context.types.filter(type => type.id !== id))
            context.setTotalCount(context.totalCount - 1)
            if (context.types.length === 0) {
                context.setPage(context.page - 1)
            }
        }).catch(err => alert(err))
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
                        type.setSelected({name: '', id: -2})
                    }}
                    style={{width: 'auto'}}
                >
                    Create type
                </Button>
                <SearchBar context={type}/>
            </Row>
            <BrandTypeTable
                data={{list: type.types}}
                updateAction={change}
                deleteAction={remove}
                context={type}
            />
            <TypeBrandModal show={modalVisible}
                            onHide={() => setModalVisible(false)}
                            actionName='Create'
                            actionTarget='type'
                            action={add}
                            context={type}
            />
        </Row>
    )
})

export default TypeSection;