import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const isLogin = useLocation().pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async (email, password) => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }

            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

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
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                    />
                    <Form.Control
                        className='mt-4'
                        placeholder='Enter your password...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Row className='d-flex justify-content-between align-items-center mt-4 ps-2 pe-3 auth-buttons'>
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
                        <Button onClick={() => click(email, password)} variant='outline-success'>
                            {isLogin ? 'Login' : 'Register'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;