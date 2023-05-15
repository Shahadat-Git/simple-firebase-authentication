import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export const LoggedUserContext = createContext('');

const Main = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    return (
        <LoggedUserContext.Provider value={[loggedUser, setLoggedUser]}>
            <div className='container mx-auto'>
                <Header />
                <Outlet></Outlet>
            </div>
        </LoggedUserContext.Provider>
    );
};

export default Main;