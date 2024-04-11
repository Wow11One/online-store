import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {createBrand} from "../../http/shoesApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const TypeBrandModal = observer(({show, onHide, action, actionTarget, actionName, context}) => {
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
                    {actionName} {actionTarget}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={context.selected.name}
                        onChange={e => context.setSelected({...context.selected, ['name']: e.target.value})}
                        placeholder={'Enter the name'}
                        name={'name'}
                        required
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger'
                        onClick={() => {
                            context.setSelected({id: -1, name: ''})
                            onHide()
                        }}
                >
                    Close
                </Button>
                <Button
                    variant='outline-success'
                    onClick={() => action(onHide, context)}
                    type={'submit'}
                >
                    {actionName}
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default TypeBrandModal;