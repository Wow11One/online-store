import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {shoes} = useContext(Context)

    const chooseType = (type) => {
        if (type === shoes.selectedType) {
            shoes.setSelectedType({})
        } else {
            shoes.setSelectedType(type)
        }
    }

    return (
        <ListGroup className='shadow-sm'>
            {shoes.types.map(type =>
                <ListGroup.Item
                    variant={'light'}
                    style={{cursor: 'pointer'}}
                    active={type.id === shoes.selectedType.id}
                    onClick={() => chooseType(type)}
                    key={type.id}>
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>

    );
});

export default TypeBar;