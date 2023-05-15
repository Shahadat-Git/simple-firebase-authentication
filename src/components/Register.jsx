import React from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

const Register = () => {
    const auth = getAuth(app)

    const handleResigter = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                profileUpdate(result.user, name)
                emailVerification(result.user)
                console.log(result.user)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const profileUpdate = (user,name) => {
        updateProfile(user, {
            displayName: name,
        })
            .then(() => {
                console.log('username updated')
            })
            .catch(e => console.log(e))
    }

    const emailVerification = (user) => {
        sendEmailVerification(user)
            .then(() => {
                console.log('check your email and verify account')
            })
            .catch(e => console.log(e))
    }
    return (
        <div>
            <h3 className='text-center bg-slate-400 text-3xl text-white py-4 my-2 rounded-lg'>Register Here</h3>
            <form onSubmit={handleResigter} className='border rounded w-1/2 mx-auto text-center'>
                <input type="text" id='name' name='name' placeholder="Your Name" className="input input-bordered input-info w-full max-w-xs m-3" />
                <br />
                <input type="email" name='email' id='email' placeholder="Your Email" className="input input-bordered input-info w-full max-w-xs m-3" />
                <br />
                <input type="password" name='password' id='password' placeholder="Your Password" className="input input-bordered input-info w-full max-w-xs m-3" />
                <br />
                <button className="btn m-3">Register</button>
            </form>
        </div>
    );
};

export default Register;