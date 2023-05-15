import React, { useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { LoggedUserContext } from '../layout/Main';

const Login = () => {
    const [loggedUser, setLoggedUser] = useContext(LoggedUserContext);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app)

    const handleLogin = (event) => {
        setError('');
        setSuccess('');
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        // validation
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password At least one uppercase character')
            return;
        }
        else if (!/(?=.*[a-z])/.test(password)) {
            setError('Password At least one lowercase character')
            return;
        }
        else if (!/(?=.*\d)/.test(password)) {
            setError('Password At least one digit')
            return;
        }
        else if (password.length < 6) {
            setError('Password Minimum 6 characters')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log(result.user)
                toast.success('Successfully Logged In')
                setSuccess('Successfully Logged In')
                event.target.reset();
                setLoggedUser(user)
            })
            .catch((error) => {
                toast.error("Something Wrong!!!!!!!!")
                setError(error.message)
                // console.log(error.message)
            })

    }


    return (
        <div>
            <h3 className='text-center bg-slate-400 text-3xl text-white py-4 my-2 rounded-lg'>Login Here</h3>
            <h3 className={`text-center text-2xl my-2 ${success ? 'text-sky-400' : 'text-red-500'}`}>{success ? success : error}</h3>
            {
                !loggedUser && <form onSubmit={handleLogin} className='border rounded w-2/3 lg:w-1/2 mx-auto text-center'>
                    <input type="email" name='email' id='email' placeholder="Your Email" className="input input-bordered input-info w-4/5 lg:w-full max-w-xs m-3" required />
                    <br />
                    <input type="password" name='password' id='password' placeholder="Your Password" className="input input-bordered input-info w-4/5 lg:w-full max-w-xs m-3" required />
                    <br />
                    <button className="btn m-3">Login</button>
                    <p className='my-2'>Don't have account? Go here <Link to={'/register'} className='link text-blue-400'>Register</Link></p>
                </form>
            }
        </div>
    );
};

export default Login;