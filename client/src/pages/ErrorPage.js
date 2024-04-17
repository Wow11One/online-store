import React from 'react';
import NavBar from "../components/shared/NavBar";
import {useLocation} from "react-router-dom";

const ErrorPage = () => {
    const {state} = useLocation()

    return (
        <div>
            <div
                className='d-flex flex-row justify-content-center align-items-center align-content-center'
                style={{height: '100vh'}}
            >
                <h2>{state ? state.message : 'ERROR! NOT FOUND'}</h2>
            </div>
        </div>
    );
};

export default ErrorPage;