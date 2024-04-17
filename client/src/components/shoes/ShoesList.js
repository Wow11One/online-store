import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ShoesItem from "./ShoesItem";
import {Row} from "react-bootstrap";

const ShoesList = observer(() => {
    const {shoes} = useContext(Context)
    return (
        <Row className='d-flex'>
            {shoes.shoesList.map(shoes =>
                <ShoesItem key={shoes.id} shoes={shoes}/>
            )}
        </Row>
    );
});

export default ShoesList;