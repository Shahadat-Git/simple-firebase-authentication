import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useContext, useRef, useState } from 'react';
import app from '../firebase/firebase.config';
import { LoggedUserContext } from '../layout/Main';
import { Link } from 'react-router-dom';

const ForgotPS = () => {
    const [loggedUser, setLoggedUser] = useContext(LoggedUserContext);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app)
    const emailRef = useRef();


    const handlePasswordReset = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;

        setError('');
        setSuccess('');


        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess('Password reset email sent! check your email!!')
                event.target.reset();
            })
            .catch((e) => {
                // console.log(error)
                setError('Wrong email!!!')
            })


    }
    return (
        <div>
            <h3 className='text-center bg-slate-400 text-3xl text-white py-4 my-2 rounded-lg'>Password Restet Here</h3>
            <h3 className={`text-center text-2xl my-2 ${success ? 'text-sky-400' : 'text-red-500'}`}>{success ? success : error}</h3>
            {
                !loggedUser && <div className='border rounded w-11/12 lg:w-1/2 mx-auto text-center'>
                    <form onSubmit={handlePasswordReset}>
                        <input type="email" ref={emailRef} name='email' id='email' placeholder="Your Email" className="input input-bordered input-info w-4/5 lg:w-full max-w-xs m-3" required />
                        <br />
                        <button className="btn m-3">Reset</button>
                    </form>

                    <p className='my-2'><Link to={'/login'} className='link text-blue-400'>Login Here</Link></p>
                </div>
            }
        </div>
    );
};

export default ForgotPS;