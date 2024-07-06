import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import './App.css'

function Navigation() {
    const [showDropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const [isNavbarOpen, setNavbarOpen] = useState(false);

    const handleNavbarToggle = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    const handleLinkClick = () => {
        setNavbarOpen(false);
    };

    const handleDropdownHover = () => {
        setDropdown(true);
    };

    const handleDropdownLeave = () => {
        setDropdown(false);
    };

    const handleWelcomeClick = () => {
        navigate("/welcome");
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/home?search=${searchTerm}`);
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUsername = localStorage.getItem('username');
            if (updatedUsername) {
                setUsername(updatedUsername);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [username]);

    useEffect(() => {
        if (location.pathname.includes('/Welcome')) {
            const searchParams = new URLSearchParams(location.search);
            const name = searchParams.get('name');
            if (name) {
                setUsername(name);
            }
        }
    }, [location]);

    const handleNotificationClick = () => {
        if (username) {
          navigate('/Notifications');
        } else {
          navigate('/Home');
        }
      };

    return (
        <section id="nav-bar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top">
                <NavLink to="/">
                    <div className="logo">
                        <i className="fa fa-laptop" style={{ fontSize: '30px', color: '#fff' }}></i>
                    </div>
                </NavLink>
                <div className="user">
                    <p style={{ fontWeight: 800, marginLeft: '30px', cursor: 'pointer' }} id="username-display" onClick={handleWelcomeClick}>
                        {username ? (
                            <NavLink to="/welcome" onClick={handleLinkClick}>{`Hi ${username}`}</NavLink>
                        ) : (
                            <NavLink to="/welcome">{`${username || ''}`}</NavLink>
                        )}
                    </p>
                </div>
                <div className="notification-container">
                        {username && (
                        <div className="notification-icon" onClick={handleNotificationClick}>
                                   <FontAwesomeIcon className="iconss" icon={faBell} />
                        </div>
                        )}
                    </div>

                

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleNavbarToggle}
                >
                    <span className="navbar-toggler-icon"><i className="fa fa-2x fa-bars" aria-hidden="true"></i></span>
                </button>
                
                    
                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link"  to="/" onClick={handleLinkClick}>HOME</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Product" onClick={handleLinkClick}>PRODUCT</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/About" onClick={handleLinkClick}>ABOUT US</NavLink>
                        </li>
                        <li className="nav-item dropdown" onMouseEnter={handleDropdownHover} onMouseLeave={handleDropdownLeave}>
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded={showDropdown}>
                                SERVICES
                            </NavLink>
                            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to="/Services" onClick={handleLinkClick}>Services</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to="/Login" onClick={handleLinkClick}>Login</NavLink>
                                <NavLink className="dropdown-item" to="/Register" onClick={handleLinkClick}>Register</NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Contact" onClick={handleLinkClick}>CONTACT US</NavLink>
                        </li>
                        <li className="nav-item">
                            <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                                <input
                                    className="form-control mr-sm-2 search"
                                    name="search_bar"
                                    type="search"
                                    placeholder="Search the laptop models & Products"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleLinkClick}>
                                    Search
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
               
            </nav>
        </section>
    );
}

export default Navigation;
