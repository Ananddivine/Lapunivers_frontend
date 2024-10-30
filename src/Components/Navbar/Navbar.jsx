import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import logos from "../Assets/Logolapy.png";
import './Navbar.css';
import { ShopContext } from "../../Context/ShopContext";

function Navigation() {
    const [showDropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const location = useLocation();
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const [hasNewNotification, setHasNewNotification] = useState(false);
    const { getTotalCartItems } = useContext(ShopContext);
    const navbarRef = useRef(null);

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

    useEffect(() => {
        const checkForNewNotifications = () => {
            setTimeout(() => {
                setHasNewNotification(true);
            }, 5000);
        };
        checkForNewNotifications();
    }, []);

    const handleNotificationClick = () => {
        if (username) {
            navigate('/Notifications');
        } else {
            navigate('/Home');
        }
        setHasNewNotification(false);
    };

    const handlePlaceholderClick = () => {
        navigate('/searchitemsdisplay');
    };
    const handelLogOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-email');
        localStorage.removeItem('userId')
        window.location.reload(); // This will refresh the page
    };
    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setNavbarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section id="nav-bar" ref={navbarRef}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top">
                <NavLink to="/">
                    <div className="logo">
                        <img src={logos} alt="Logo" style={{ width: '50px', height: '50px' }} />
                    </div>
                </NavLink>
                <div className="user">
                    <p style={{ fontWeight: 800, marginLeft: '30px', cursor: 'pointer'}} id="username-display" onClick={handleWelcomeClick}>
                        {username ? (
                            <NavLink className="navlinks" to="/welcome" onClick={handleLinkClick}>{`Hi ${username}`}</NavLink>
                        ) : (
                            <NavLink to="/welcome">{`${username || ''}`}</NavLink>
                        )}
                    </p>
                </div>
                <div className="notification-container">
                    {username && (
                        <div className={`notification-icon ${hasNewNotification ? 'new-notification' : ''}`} onClick={handleNotificationClick}>
                            <FontAwesomeIcon className="iconss" icon={faBell} />
                        </div>
                    )}
                </div>
                {username && (
        <div className="nav-cart">
            <div className="nav-cart-count">{getTotalCartItems()}</div>
            <NavLink to="/cart">
                <FontAwesomeIcon className="cart-icon" icon={faCartArrowDown} />
            </NavLink>
        </div>
    )}
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
                            <NavLink className="nav-link" to="/" onClick={handleLinkClick}>HOME</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Products" onClick={handleLinkClick}>PRODUCTS</NavLink>
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
                                {localStorage.getItem('auth-token')
                                ?<button onClick={handelLogOut}>Log Out</button>
                            :<Link className="dropdown-item" to="/Login" onClick={handleLinkClick}>Login</Link>}
                        
                                <NavLink className="dropdown-item" to="/Register" onClick={handleLinkClick}>Register</NavLink>
                            </div>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Contact" onClick={handleLinkClick}>CONTACT US</NavLink>
                        </li>
                        <li className="nav-item">

                        {/* Conditionally render the search input field */}
                        {location.pathname !== '/searchitemsdisplay' && (
                           
                                <form className="form-inline my-2 my-lg-0">
                                    <input
                                        className="form-control mr-sm-2 search"
                                        name="search_bar"
                                        type="search"
                                        placeholder="Search the laptop models & Products"
                                        aria-label="Search"
                                        onClick={handlePlaceholderClick}
                                    />
                                   
                                </form>
                          
                        )}
                          </li>
                    </ul>
                </div>
            </nav>
        </section>
    );
}

export default Navigation;
