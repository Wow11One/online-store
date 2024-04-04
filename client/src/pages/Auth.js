import React from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from 'react-router-dom';
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const isLogin = useLocation().pathname === LOGIN_ROUTE
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >

            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-4'
                        placeholder='Enter your email...'
                    />
                    <Form.Control
                        className='mt-4'
                        placeholder='Enter your password...'
                    />
                    <Row className='d-flex justify-content-between mt-4 ps-2 pe-3'>
                        {isLogin ?
                            <div>
                                No account? <NavLink to={REGISTRATION_ROUTE}>
                                Registration
                            </NavLink>
                            </div>
                            :
                            <div>
                                Already registered? <NavLink to={LOGIN_ROUTE}>
                                Login
                            </NavLink>
                            </div>
                        }
                        <Button className='auth-button' variant='outline-success'>
                            {isLogin ? 'Login' : 'Register'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;