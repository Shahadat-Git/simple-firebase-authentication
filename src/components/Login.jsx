import React, { useContext, useState } from 'react';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { LoggedUserContext } from '../layout/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    const [loggedUser, setLoggedUser] = useContext(LoggedUserContext);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app)
    const githubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const twitterProvider = new TwitterAuthProvider();

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
                // console.log(result.user)
                if (user.emailVerified) {
                    toast.success('Successfully Logged In')
                    setSuccess('Successfully Logged In')
                    event.target.reset();
                    setLoggedUser(user)

                }
                else {
                    setError('Verify your email first');
                    toast.error('Unverified email!')
                }
            })
            .catch((error) => {
                toast.error("Something Wrong!!!!!!!!")
                setError(error.message)
                // console.log(error.message)
            })

    }
    const handleGithubLogin = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const user = result.user;
                // console.log(result.user)
                toast.success('Successfully Logged In')
                setSuccess('Successfully Logged In')
                setLoggedUser(user)
            })
            .catch((error) => {
                toast.error("Something Wrong!!!!!!!!")
                setError(error.message)
                // console.log(error.message)
            })

    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                // console.log(result.user)
                toast.success('Successfully Logged In')
                setSuccess('Successfully Logged In')
                setLoggedUser(user)
            })
            .catch((error) => {
                toast.error("Something Wrong!!!!!!!!")
                setError(error.message)
                // console.log(error.message)
            })
    }
    // const handleFacebookLogin = () => {
    //     signInWithPopup(auth, facebookProvider)
    //         .then((result) => {
    //             const user = result.user;
    //             // console.log(result.user)
    //             toast.success('Successfully Logged In')
    //             setSuccess('Successfully Logged In')
    //             setLoggedUser(user)
    //         })
    //         .catch((error) => {
    //             toast.error("Something Wrong!!!!!!!!")
    //             setError(error.message)
    //             // console.log(error.message)
    //         })
    // }
    const handleTwitterLogin = () => {
        signInWithPopup(auth, twitterProvider)
            .then((result) => {
                const user = result.user;
                // console.log(result.user)
                toast.success('Successfully Logged In')
                setSuccess('Successfully Logged In')
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
                !loggedUser && <div className='border rounded w-11/12 lg:w-1/2 mx-auto text-center'>
                    <form onSubmit={handleLogin}>
                        <input type="email" name='email' id='email' placeholder="Your Email" className="input input-bordered input-info w-4/5 lg:w-full max-w-xs m-3" required />
                        <br />
                        <input type="password" name='password' id='password' placeholder="Your Password" className="input input-bordered input-info w-4/5 lg:w-full max-w-xs m-3" required />
                        <br />
                        <button className="btn m-3">Login</button>
                    </form>
                    <div className='flex flex-col  items-center gap-2'>
                        <button onClick={handleGithubLogin} className='bg-[#24292D] hover:bg-[#24292dab]
                        text-white p-2 rounded font-semibold flex items-center gap-4'><FontAwesomeIcon className='text-white text-3xl' icon={faGithub} />Sign in with GitHub</button>
                        <button onClick={handleGoogleLogin} className='bg-[#4285F4] hover:bg-[#1262e4] text-white p-2 rounded font-semibold flex items-center gap-4'><FontAwesomeIcon className='text-white text-3xl' icon={faGoogle} />Sign in with Google</button>
                        {/* <button onClick={handleFacebookLogin} className='bg-[#5070A7] hover:bg-[#4268aa] text-white p-2 rounded font-semibold flex items-center gap-4'><FontAwesomeIcon className='text-white text-3xl' icon={faFacebook} />Sign in with Facebook</button> */}
                        <button onClick={handleTwitterLogin} className='bg-[#00A1EE] hover:bg-[#02afff] text-white p-2 rounded font-semibold flex items-center gap-4'><FontAwesomeIcon className='text-white text-3xl' icon={faTwitter} />Sign in with Twitter</button>
                    </div>
                    <p className='my-2'><Link to={'/forgotpassword'} className='link text-blue-400'>Forgotten password?</Link></p>
                    <p className='my-2'>Don't have account? Go here <Link to={'/register'} className='link text-blue-400'>Register</Link></p>
                </div>
            }
        </div>
    );
};

export default Login;