import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="rcdb-header">
            <div className="rcdb-header-content">
            <Link to="/">
                <img className="rcdb-logo" src="./images/reactCrag_logo2.png" alt="rcdb-logo"/>
            </Link>
                <img className="rcdb-tmdb-logo" src="./images/rcdb_logo.png" alt="rcdb-logo"/>
            </div>
        </div>
    );
};

export default Header;