import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img
                    className="logo"
                    src={assets.logo}
                    alt="Salman Pipe Fitting Store logo"
                />

                <h2 className="store-name">
                    Salman Pipe Fitting Store
                </h2>
            </div>

            <img
                src={assets.profile_image}
                alt="Admin profile"
                className="profile"
            />
        </nav>
    )
}

export default Navbar