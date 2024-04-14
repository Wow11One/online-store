import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, ORDER_PAGE_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="white" data-bs-theme="light" className='shadow-sm'>
            <Container>
                <Navbar.Brand href={SHOP_ROUTE}>Shoes.com</Navbar.Brand>
                {user.isAuth ?
                    <Nav className='ml-auto align-items-center'>
                        <Button
                            variant='outline-secondary'
                            onClick={() => navigate(ORDER_PAGE_ROUTE)}
                            className='me-3'
                        >
                            Basket
                        </Button>
                        <Button
                            variant='outline-secondary'
                            onClick={() => navigate(ADMIN_ROUTE)}
                            className='me-3'
                        >
                            Admin
                        </Button>
                        <Button
                            variant='outline-secondary'
                            onClick={() => logOut()}
                            className='me-3'
                        >
                            Log Out
                        </Button>
                    </Nav>
                    :
                    <Nav className='ml-auto' style={{color: 'white'}}>
                        <Button
                            size='ms-3'
                            variant='outline-secondary'
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Log In</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;