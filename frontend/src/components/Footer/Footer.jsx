import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className="footer" id='footer'>
            <div className="footer-content">

                <div className="footer-content-left">
                    <img src={assets.logo} alt="footer-logo" className='logo' />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, laudantium minima fuga ipsa temporibus distinctio suscipit vero repudiandae, quo placeat maxime et officiis
                        aperiam explicabo dignissimos accusamus qui natus modi?</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>01690205129</li>
                        <li>info@gmail.com</li>
                    </ul>
                </div>

            </div>
            <hr />
            <p className="footer-copyright"> Copyright 2024 &copy;Khaidai.com All Rights Reserved. </p>
        </div>
    )
}

export default Footer