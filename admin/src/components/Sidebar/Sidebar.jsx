
import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/order" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
