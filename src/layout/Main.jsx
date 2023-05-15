import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Main = () => {
    return (
        <div className='container mx-auto'>
            <Header/>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;