import React, {useContext, useState} from 'react';
import {Button, Row, Table} from "react-bootstrap";
import TypeBrandModal from "./modals/TypeBrandModal";
import {Context} from "../index";
import Pages from "./Pages";

const BrandTypeTable = ({data, updateAction, deleteAction, context}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [value, setValue] = useState({id: -2, name: ''})
    return (
        <Row>
            <Table
                className='shadow-sm mt-3'
                striped
                hover
                size="sm"
            >
                <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>

                {data.brands.map((item, index) =>
                    <tr key={item.id}>
                        <td>{(index + 1) + context.limit * (context.page - 1)}</td>
                        <td>{item.name}</td>
                        <td>
                            <Button
                                type='button'
                                variant='outline-secondary'
                                onClick={() => {
                                    setValue({name: item.name, id: item.id})
                                    context.setSelected(item)
                                    setModalVisible(true)
                                }
                                }
                            >
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height="16" fill='currentColor'
                                     className="bi bi-arrow-repeat" viewBox="-1 1 16 16">
                                    <path
                                        d='M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0
                                            1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0
                                            0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9'>

                                    </path>
                                    <path fillRule='evenodd'
                                          d='M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002
                                              6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0
                                              8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z'></path>
                                </svg>
                            </Button>
                        </td>
                        <td>
                            <Button
                                type='button'
                                variant='outline-secondary'
                                onClick={() => deleteAction(context, item.id)}
                            >
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                     className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path
                                        d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2
                                            2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1
                                            1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5
                                            0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5
                                            0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0'>

                                    </path>
                                </svg>
                            </Button>
                        </td>
                    </tr>
                )}
                </tbody>
                <TypeBrandModal show={modalVisible}
                                onHide={() =>
                                    setModalVisible(false)
                                }
                                actionName='Change'
                                actionTarget={data.target}
                                action={updateAction}
                                context={context}
                />
            </Table>
            <Pages context={context}/>
        </Row>);
};

export default BrandTypeTable;