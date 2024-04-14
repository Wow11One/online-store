import React, {useContext} from 'react';
import {FormControl, Image, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {SERVER_URL, SHOES_ROUTE} from "../../utils/consts";
import DeleteButton from "../DeleteButton";
import {useNavigate} from "react-router-dom";

const BasketTable = observer(() => {
    const {order} = useContext(Context)
    const navigate = useNavigate()

    const changeAmount = (e, item) => {
        let newAmount = e.target.value > 0 ? e.target.value : 1
        newAmount = e.target.value < 41 ? e.target.value : 40
        const newBasket = order.basket.map(i => i.shoesId === item.shoesId && i.size === item.size
            ? {...i, amount: newAmount}
            : i)
        order.setBasket(newBasket)
        localStorage.setItem('basket', JSON.stringify(newBasket))
    }

    const deleteFromBasket = (id) => {
        const newBasket = order.basket.filter(item => item.id !== id)
        order.setBasket(newBasket)
        localStorage.setItem('basket', JSON.stringify(newBasket))
    }
    return (
        <Table>
            <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Size</th>
                <th>Remove</th>
                <th>Unit Price</th>
                <th>Total price</th>
            </tr>
            </thead>
            <tbody>
            {order.basket.map(item =>
                <tr key={item.id}>
                    <td><Image
                        width={50}
                        height={50}
                        src={SERVER_URL + item.img}
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate(SHOES_ROUTE + '/' + item.shoesId)}
                    /></td>
                    <td>{item.name}</td>
                    <td>
                        <FormControl
                            value={item.amount}
                            style={{width: '80%'}}
                            type='number'
                            min='1'
                            max='100'
                            onChange={e => changeAmount(e, item)}/>
                    </td>
                    <td>{item.size}</td>
                    <td><DeleteButton deleteAction={() => deleteFromBasket(item.id)}/></td>
                    <td>{item.price} hrn</td>
                    <td><b>{item.price * item.amount} hrn</b></td>
                </tr>
            )}
            <tr>
                <td colSpan={6}></td>
                <td><b>{order.totalPrice} hrn</b></td>
            </tr>
            </tbody>
        </Table>
    );
})

export default BasketTable;