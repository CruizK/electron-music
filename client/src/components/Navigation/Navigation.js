import React from 'react'
import { FaSearch, FaCompactDisc, FaHome, FaListUl } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <div className="nav-bar">
      <NavLink className="nav-item" activeClassName="nav-active" exact to="/">
        <FaListUl color={'#999'} size={32}/>
      </NavLink>
      <NavLink className="nav-item" activeClassName="nav-active" to="/player">
        <FaCompactDisc color={'#999'} size={32}/>
      </NavLink>
      <NavLink className="nav-item" activeClassName="nav-active" to="/search">
        <FaSearch color={'#999'} size={32}/>
      </NavLink>
    </div>
  )
}

export default Navigation