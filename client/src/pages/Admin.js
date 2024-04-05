import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";
import CreateBrand from "../components/modals/CreateBrand";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className='d-flex flex-column'>
            <Button className='mt-2'
                    variant='outline-dark'
                    onClick={() => setTypeVisible(true)}
            >
                Add type</Button>
            <Button className='mt-2'
                    onClick={() => setBrandVisible(true)}
                    variant='outline-dark'
            >
                Add Brand</Button>
            <Button className='mt-2'
                    onClick={() => setDeviceVisible(true)}
                    variant='outline-dark'
            >
                Add Device</Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;