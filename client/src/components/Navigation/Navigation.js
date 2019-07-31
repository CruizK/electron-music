import React from 'react'
import { FaSearch, FaCompactDisc, FaHome } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

const Navigation = ({history}) => {
  return (
    <div className="nav-bar">
      <NavLink className="nav-item" activeClassName="nav-active" exact to="/">
        <FaHome color={'#999'} size={32}/>
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