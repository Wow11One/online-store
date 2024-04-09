import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes} from "../../http/shoesApi";
import {observer} from "mobx-react-lite";

const DeviceModal = observer(({show, onHide}) => {
    const {shoes} = useContext(Context)
    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => shoes.setTypes(data))
        fetchBrands().then(data => shoes.setBrands(data))

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
    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('brandId', shoes.selectedBrand.id)
        formData.append('typeId', shoes.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
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
                    Create a new device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle variant={'secondary'}>
                            {shoes.selectedType.name || 'Choose type'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {shoes.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => shoes.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle variant={'secondary'}>
                            {shoes.selectedBrand.name || 'Choose brand'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
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
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-3'
                        placeholder='Enter the name of a new device'
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Enter the price of a new device'
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter the device picture'
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
                <Button variant='outline-success' onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DeviceModal;