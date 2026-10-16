
import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img
                    className="jamil-logo"
                    src={assets.jamil_logo}
                    alt="Salman Pipe Fitting Store logo"
                />

                <h2 className="store-name">
                    জামিল স্যানেটারি এন্ড হার্ডওয়্যার
                </h2>
            </div>

            <img
                src={assets.owner_image}
                alt="Admin profile"
                className="profile"
            />
        </nav>
    )
}

export default Navbar