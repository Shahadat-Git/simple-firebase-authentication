import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Register = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app)

    const handleResigter = (event) => {
        setError('');
        setSuccess('');
        event.preventDefault();
        const name = event.target.name.value;
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

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                profileUpdate(result.user, name)
                emailVerification(result.user)
                // console.log(result.user)
                toast.success('Successfully Account Created!')
                // setSuccess('Successfully Account Created!')
                event.target.reset();
            })
            .catch((error) => {
                toast.error("Something Wrong!!!!!!!!")
                setError(error.message)
                // console.log(error.message)
            })
    }

    const profileUpdate = (user, name) => {
        updateProfile(user, {
            displayName: name,
        })
            .then(() => {
                // console.log('username updated')
            })
            .catch(e => console.log(e))
    }

    const emailVerification = (user) => {
        sendEmailVerification(user)
            .then(() => {
                // console.log('check your email and verify account')
                setSuccess('Check your email and verify your account')
            })
            .catch(e => console.log(e))
    }
    return (
        <div>
            <h3 className='text-center bg-slate-400 text-3xl text-white py-4 my-2 rounded-lg'>Register Here</h3>
            <h3 className={`text-center text-2xl my-2 ${success ? 'text-sky-400' : 'text-red-500'}`}>{success ? success : error}</h3>
            <form onSubmit={handleResigter} className='border rounded w-2/3 lg:w-1/2  mx-auto text-center'>
                <input type="text" id='name' name='name' placeholder="Your Name" className="input input-bordered input-info w-4/5 lg:w-full max-w-xs m-3" required />
                <br />
                <input type="email" name='email' id='email' placeholder="Your Email" className="input input-bordered input-info w-4/5 lg:w-full max-w-xs m-3" required />
                <br />
                <input type="password" name='password' id='password' placeholder="Your Password" className="input input-bordered input-info w-4/5 lg:w-full max-w-xs m-3" required />
                <br />
                <button className="btn m-3">Register</button>
                <p className='my-2'>Already have an account? Go here <Link to={'/login'} className='link text-blue-400'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;