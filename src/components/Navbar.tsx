import "./Navbar.css"
import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import logo from "../img/twh.svg"

const Navbar: React.FC = () => {
    const [active, setActive] = useState<boolean>(false)
    const [navBarActiveClass, setNavBarActiveClass] = useState<string>("")

    const toggleHamburger = () => {
        // toggle the active boolean in the state
        setActive(!active)
    }

    useEffect(() => {
        // set the class in state for the navbar accordingly
        active ? setNavBarActiveClass("is-active") : setNavBarActiveClass("")
    }, [active])

    return (
        <nav
            className="navbar"
            role="navigation"
            aria-label="main-navigation"
            style={{
                background: "#040508",
            }}
        >
            <div className="container">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item" title="Logo">
                        <img
                            src={logo}
                            alt="Kaldi"
                            style={{ width: "25px", height: "30px" }}
                        />
                        <div style={{ width: "10px" }} />
                        <h1 className="navbar-menu-item">Tiu Wee Han</h1>
                    </Link>
                    {/* Hamburger menu */}
                    <div
                        className={`navbar-burger burger ${navBarActiveClass}`}
                        data-target="navMenu"
                        onClick={toggleHamburger}
                    >
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
                <div
                    id="navMenu"
                    className={`navbar-menu ${navBarActiveClass}`}
                >
                    <div className="navbar-end has-text-centered">
                        <Link className="navbar-item" to="/">
                            <span className="navbar-menu-item">About</span>
                        </Link>
                        <Link className="navbar-item" to="/experience">
                            <span className="navbar-menu-item">Experience</span>
                        </Link>
                        <Link className="navbar-item" to="/blog">
                            <span className="navbar-menu-item">Blog</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
