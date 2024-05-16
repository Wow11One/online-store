import React, {useContext, useEffect} from 'react'
import {Button, Row, Table} from "react-bootstrap";
import Pages from "../shared/Pages";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchAllOrders} from "../../http/orderApi";
import {useNavigate} from "react-router-dom";
import {ORDER_PAGE_ROUTE, ORDER_PAGE_TYPE_READONLY} from "../../utils/consts";

const OrderTable = observer(() => {
    const {order} = useContext(Context)
    const navigate = useNavigate()
    const fetchOrders = () => {
        fetchAllOrders(
            order.limit,
            order.page,
            order.search,
            order.state)
            .then(data => {
                order.setOrders(data.rows)
                order.setTotalCount(data.count)
                console.log(data.rows)
            })
    }

    useEffect(() => {
        order.setState('')
        fetchOrders()
    }, [])

    useEffect(() => {
        fetchOrders()
    }, [order.page, order.search, order.state])
    return (
        <div>
            <Table
                className='shadow-sm mt-3'
                striped
                hover
                size="sm"
            >
                <thead>
                <tr>
                    <th>№</th>
                    <th>State</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Created</th>
                    <th>Change</th>
                    <th>Show</th>
                </tr>
                </thead>
                <tbody>

                {order.orders.map((item, index) =>
                    <tr key={item.id}>
                        <td>{(index + 1) + order.limit * (order.page - 1)}</td>
                        <td>{item.state}</td>
                        <td>{item.username}</td>
                        <td>{item.userSurname}</td>
                        <td>{item.createdAt.replace(/T/, ' ').replace(/\..+/, '')}</td>
                        <td>
                            <Button
                                type='button'
                                variant='outline-secondary'
                                disabled={false}
                                onClick={() =>
                                    navigate(ORDER_PAGE_ROUTE + '/' + item.id + '/update'
                                    )
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
                                onClick={() =>
                                    navigate(ORDER_PAGE_ROUTE + '/' + item.id,
                                        {
                                            state: {type: ORDER_PAGE_TYPE_READONLY}
                                        }
                                    )
                                }
                            >
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor'
                                     className='bi bi-box-arrow-in-up-left' viewBox='0 0 16 16'>
                                    <path fillRule='evenodd'
                                          d='M9.636 13.5a.5.5 0 0 1-.5.5H2.5A1.5 1.5 0
                                          0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1h10A1.5
                                          1.5 0 0 1 14 2.5v6.636a.5.5 0 0 1-1 0V2.5a.5.5
                                          0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0
                                          0 .5.5h6.636a.5.5 0 0 1 .5.5'/>
                                    <path fillRule='evenodd'
                                          d='M5 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0
                                          1H6.707l8.147 8.146a.5.5 0 0 1-.708.708L6
                                          6.707V10.5a.5.5 0 0 1-1 0z'/>
                                </svg>
                            </Button>
                        </td>
                    </tr>
                )
                }
                </tbody>
            </Table>
            <Pages context={order}/>
        </div>
    )
})

export default OrderTable;