import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';

const NavBar = () => {

  const {user, signOutUser}= UseAuth()

  const handleLogout =()=>{
    signOutUser()
    .then()
    .catch(error=>{
      console.log(error)
    })
  }

  const links = <>
  <NavLink to="/service">Service</NavLink>
  <NavLink to='/coverage'>Coverage</NavLink>
  <NavLink to="/about">About Us</NavLink>
  <NavLink to="/pricing">Pricing</NavLink>
  <NavLink to="/blog">Blog</NavLink>
  <NavLink to="/sendParcel">Send Parcel</NavLink>
  <NavLink to="/contact">Contact</NavLink>
  </>
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><Logo></Logo></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu flex gap-5 menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user ? <Link onClick={handleLogout} className="btn">Log Out</Link> : <Link className="btn" to='/login'>Login</Link>
    }
    <Link className="btn btn-primary text-black mx-4" to='/rider'>Be a Rider</Link>
  </div>
</div>
    </div>
  );
};

export default NavBar;