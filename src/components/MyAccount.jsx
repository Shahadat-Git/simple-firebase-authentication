import React, { useContext } from 'react';
import { LoggedUserContext } from '../layout/Main';

const MyAccount = () => {
    const [loggedUser, setLoggedUser] = useContext(LoggedUserContext);
    return (
        <div>
            {
                !loggedUser && <h3 className='text-center text-warning text-5xl my-4'>
                    Please Login First
                </h3>
            }
            {
                loggedUser &&
                <div>
                    <h1 className='text-center text-5xl text-red-200 my-10'>Data coming soon!!!!!</h1>
                </div>
            }
        </div>
    );
};

export default MyAccount;