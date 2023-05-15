import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='bg-slate-600 rounded py-3 px-3'>
            <div className="navbar flex justify-between">
                <div className="">
                    <a className="btn btn-ghost normal-case text-3xl text-white font-bold">FAuth</a>
                </div>
                <div className=" flex gap-4 text-white font-semibold text-xl">
                    <NavLink className={({isActive})=>isActive? 'text-blue-300' : ''} to={'/'}>Home</NavLink>
                    <NavLink className={({isActive})=>isActive? 'text-blue-300' : ''} to={'/login'}>Login</NavLink>
                    <NavLink className={({isActive})=>isActive? 'text-blue-300' : ''} to={'/register'}>Register</NavLink>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;