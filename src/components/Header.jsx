import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LoggedUserContext } from '../layout/Main';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';

const Header = () => {
    const [loggedUser, setLoggedUser] = useContext(LoggedUserContext);
    const auth = getAuth(app)
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setLoggedUser(null);
                toast.success('Successfully LoggedOut')
            })
            .catch(e => console.log(e))
    }
    return (
        <nav className='bg-slate-600 rounded py-3 px-3'>
            <div className="navbar flex justify-between">
                <div className="">
                    <Link to={'/'} className="btn btn-ghost normal-case text-3xl text-white font-bold">FAuth</Link>
                </div>
                <div className=" flex gap-4 text-white font-semibold text-xl">
                    {/* <NavLink className={({ isActive }) => isActive ? 'text-blue-300' : ''} to={'/'}>Home</NavLink> */}
                    {
                        !loggedUser && <>
                            <NavLink className={({ isActive }) => isActive ? 'text-blue-300' : ''} to={'/login'}>Login</NavLink>
                            <NavLink className={({ isActive }) => isActive ? 'text-blue-300' : ''} to={'/register'}>Register</NavLink>
                        </>
                    }
                </div>
                {
                    loggedUser ? <div className="dropdown dropdown-end flex gap-3">
                        <h2 className='text-slate-400'>Hello, <span className='text-xl text-white'>{loggedUser.displayName}</span></h2>
                        <div>
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={loggedUser.photoURL ? loggedUser.photoURL : "https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg"} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <Link  to={'/myaccount'} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><p onClick={handleLogout}>Logout</p></li>
                            </ul>
                        </div>
                    </div> : ''
                }
            </div>
        </nav>
    );
};

export default Header;