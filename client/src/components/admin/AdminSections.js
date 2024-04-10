import React, {useContext, useState} from 'react';
import {ListGroup} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const AdminSections = observer(({adminSection, onClick, active}) => {
    const {shoes} = useContext(Context)

    return (
        <ListGroup.Item
            variant={'light'}
            style={{cursor: 'pointer'}}
            active={active}
            onClick={onClick}
            key={adminSection}>
            {adminSection}
        </ListGroup.Item>
    );
});

export default AdminSections;