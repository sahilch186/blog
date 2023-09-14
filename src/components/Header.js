import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({active, setActive, user, logout}) => {
    const userId = user?.uid;
    // console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow py-0 fixed-top">
        <div className="container-fluid padding-media">
            <div className="container padding-media">
                <nav className='navbar navbar-light py-0'>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id='navbarSupportContent'>
                            <Link to='/'><li className={`nav-item nav-link ${active === 'home' ? "active" : ""}`} onClick={() => setActive('home')}>All Blogs</li></Link>
                            <Link to='/create'><li className={`nav-item nav-link ${active === 'create' ? "active" : ""}`} onClick={() => setActive('create')}>Create Blog</li></Link>
                            {/* <Link to='/about'><li className={`nav-item nav-link ${active === 'about' ? "active" : ""}`} onClick={() => setActive('about')}>About</li></Link> */}
                        </ul>
                        <div className="row g-3">
                            <ul className="navbar-nav me-auto align-items-center">
                                {
                                    userId ? (
                                        <>
                                            <p className='my-0'>Hello <strong>{user?.displayName}</strong></p>
                                            <li className={`nav-item nav-link`} onClick={() => logout()}>Logout</li>
                                        </>
                                    )
                                    :
                                    (
                                        <Link to='/auth'><li className={`nav-item nav-link ${active === 'login' ? "active" : ""}`} onClick={() => setActive('login')}>Login</li></Link>
                                    )
                                }
                            </ul>
                        </div>
                </nav>
            </div>
        </div>
    </nav>
  )
}

export default Header