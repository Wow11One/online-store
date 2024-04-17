import React, {useContext, useEffect, useState} from 'react'
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap"
import {Context} from "../../index"
import {
    createShoes,
    fetchBrands,
    fetchOnePairOfShoes,
    fetchShoesList,
    fetchTypes,
    updateShoes
} from "../../http/shoesApi"
import {observer} from "mobx-react-lite"
import {DELIVERY_TYPE_NOVA_POST, ORDER_PAGE_TYPE_CREATE, possibleSizes} from "../../utils/consts"
import {createOrder, updateOrder} from "../../http/orderApi"
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap'
import data from "bootstrap/js/src/dom/data";
import {Multiselect} from "multiselect-react-dropdown";

const ShoesModal = observer(({show, onHide, actionName}) => {
    const {shoes, type, brand} = useContext(Context)
    const [info, setInfo] = useState([])
    const [file, setFile] = useState(null)
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        fetchTypes().then(data => type.setTypes(data.rows))
        fetchBrands().then(data => brand.setBrands(data.rows))
        if (actionName === 'Change' && show) {
            console.log(shoes.selected.id)
            fetchOnePairOfShoes(shoes.selected.id)
                .then(data => {
                    setInfo(data.info.map(item => {
                        return {
                            number: item.id,
                            title: item.title,
                            description: item.description
                        }
                    }))
                    return data
                })
                .then(data => {
                    shoes.setSelectedSizes(data.sizes.map(item => item.sizeValue))
                })
        }
    }, [show])


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
        formData.append('sizes', JSON.stringify(shoes.selectedSizes))
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
                setValidated(false)
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
                setValidated(false)
            })
            .catch(err => alert(err))
    }

    const handleSubmit = (event) => {
        console.log('here')
        const form = event.currentTarget
        event.preventDefault()
        if (form.checkValidity() === false || !shoes.selected.type.name || !shoes.selected.brand.name) {
            event.stopPropagation()
            setValidated(true)
            alert('not correct data')
        } else {
            if (actionName === 'Create') {
                addShoes()
            } else {
                changeShoes()
            }
        }
    }

    return (
        <Modal
            show={show}
            onHide={() => {
                onHide()
                setValidated(false)
            }}
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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group
                        className='mt-2 d-flex flex-row justify-content-between align-items-center'
                        controlId='validationCustom01'
                    >
                        <div>
                            <Form.Label>
                                Type
                            </Form.Label>
                        </div>
                        <div>
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
                        </div>
                    </Form.Group>
                    <Form.Group
                        className='mt-2 d-flex flex-row justify-content-between align-items-center'
                        controlId='validationCustom02'
                    >
                        <div>
                            <Form.Label>
                                Brand
                            </Form.Label>
                        </div>
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
                    </Form.Group>
                    <Form.Group
                        className='mt-3 d-flex flex-row justify-content-between align-items-center'
                        controlId='validationCustom03'
                    >
                        <div>
                            <Form.Label>
                                Name
                            </Form.Label>
                        </div>
                        <Form.Control
                            value={shoes.selected.name}
                            onChange={e => shoes.setSelected({...shoes.selected, name: e.target.value})}
                            placeholder='Enter the name of a new shoes'
                            required
                            style={{width: '73%'}}
                        />
                    </Form.Group>
                    <Form.Group
                        className='mt-3 d-flex flex-row justify-content-between align-items-center'
                        controlId='validationCustom04'
                    >
                        <div>
                            <Form.Label>
                                Price
                            </Form.Label>
                        </div>
                        <Form.Control
                            value={shoes.selected.price}
                            onChange={e => shoes.setSelected({...shoes.selected, price: Number(e.target.value)})}
                            placeholder='Enter the price of a new shoes'
                            style={{width: '73%'}}
                            type='number'
                            min={30}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <div>
                            <Form.Label>
                                Image
                            </Form.Label>
                        </div>
                        <Form.Control
                            placeholder='Enter the shoes picture'
                            className='mt-2'
                            type='file'
                            onChange={selectFile}
                            required={actionName === 'Create'}
                        />
                    </Form.Group>
                    <div className='mt-3' style={{height: '30%'}}>
                        <Multiselect
                            placeholder={'choose size'}
                            options={possibleSizes}
                            name='sizes'
                            isObject={false}
                            selectedValues={shoes.selectedSizes}
                            onSelect={(selectedList) => shoes.setSelectedSizes(selectedList)}
                            onRemove={(selectedList) => shoes.setSelectedSizes(selectedList)}
                        />
                    </div>
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
                                    required
                                    value={row.title}
                                    onChange={e => changeInfo('title', e.target.value, row.number)}
                                    placeholder='Quality name'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    required
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
                    <Modal.Footer className='mt-3'>
                        <Button variant='outline-danger' onClick={() => {
                            onHide()
                            setValidated(false)
                        }}
                        >
                            Close
                        </Button>
                        <Button
                            variant='outline-success'
                            type='submit'
                        >
                            {actionName}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
})

export default ShoesModal;