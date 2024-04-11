import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createShoes, fetchBrands, fetchShoesList, fetchTypes, updateShoes} from "../../http/shoesApi";
import {observer} from "mobx-react-lite";

const ShoesModal = observer(({show, onHide, actionName, context}) => {
    const {shoes, type, brand} = useContext(Context)
    const [info, setInfo] = useState([])
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => type.setTypes(data.rows))
        fetchBrands().then(data => brand.setBrands(data.rows))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(row => row.number !== number))
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const createFormData = () => {
        const formData = new FormData()
        formData.append('id', shoes.selected.id)
        formData.append('name', shoes.selected.name)
        formData.append('price', shoes.selected.price)
        formData.append('img', file)
        formData.append('brandId', shoes.selected.brand.id)
        formData.append('typeId', shoes.selected.type.id)
        formData.append('info', JSON.stringify(info))
        return formData
    }
    const addShoes = () => {
        const formData = createFormData()
        createShoes(formData)
            .then(data => {
                fetchShoesList(undefined,
                    undefined,
                    shoes.page,
                    shoes.limit,
                    shoes.search,
                    undefined)
                    .then(data => {
                        shoes.setShoesList(data.rows)
                        shoes.setTotalCount(data.count)
                    })
                onHide()
            })
            .catch(err => alert(err))
    }

    const changeShoes = () => {
        const formData = createFormData()
        updateShoes(formData)
            .then(data => {
                fetchShoesList(undefined,
                    undefined,
                    shoes.page,
                    shoes.limit,
                    shoes.search,
                    undefined)
                    .then(data => {
                        shoes.setShoesList(data.rows)
                        shoes.setTotalCount(data.count)
                    })
                onHide()
            })
            .catch(err => alert(err))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    {actionName} shoes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle variant={'secondary'}>
                            {shoes.selected.type.name || 'Choose type'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {type.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => shoes.setSelected({...shoes.selected, type})}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle variant={'secondary'}>
                            {shoes.selected.brand.name || 'Choose brand'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brand.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => shoes.setSelected({...shoes.selected, brand})}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={shoes.selected.name}
                        onChange={e => shoes.setSelected({...shoes.selected, name: e.target.value})}
                        className='mt-3'
                        placeholder='Enter the name of a new shoes'
                    />
                    <Form.Control
                        value={shoes.selected.price}
                        onChange={e => shoes.setSelected({...shoes.selected, price: Number(e.target.value)})}
                        className='mt-3'
                        placeholder='Enter the price of a new shoes'
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter the shoes picture'
                        type='file'
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant='outline-dark'
                        onClick={addInfo}
                    >
                        Add a new quality
                    </Button>
                    {info.map(row =>
                        <Row key={row.number} className='mt-3'>
                            <Col md={4}>
                                <Form.Control
                                    value={row.title}
                                    onChange={e => changeInfo('title', e.target.value, row.number)}
                                    placeholder='Quality name'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={row.description}
                                    onChange={e => changeInfo('description', e.target.value, row.number)}
                                    placeholder='Quality value'
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant='outline-danger'
                                    onClick={() => removeInfo(row.number)}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Close</Button>
                <Button
                    variant='outline-success'
                    onClick={actionName === 'Create'
                        ? addShoes
                        : changeShoes}
                    type={'submit'}
                >
                    {actionName}
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default ShoesModal;