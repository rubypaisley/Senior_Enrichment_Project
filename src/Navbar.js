import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className="nav nav-pills">
            <li className="nav-item"><NavLink exact to="/" className="nav-link" activeClassName="nav-link active">Home</NavLink></li>
            <li className="nav-item"><NavLink exact to="/campuses" className="nav-link" activeClassName="nav-link active">All Campuses</NavLink></li>
            <li className="nav-item"><NavLink exact to="/students" className="nav-link" activeClassName="nav-link active">AllStudents</NavLink></li>
        </ul>
    )
}

export default Navbar
