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
            className="navbar is-transparent"
            role="navigation"
            aria-label="main-navigation"
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
                        <h1>Tiu Wee Han</h1>
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
                        <Link className="navbar-item" to="/about">
                            About
                        </Link>
                        <Link className="navbar-item" to="/products">
                            Products
                        </Link>
                        <Link className="navbar-item" to="/blog">
                            Blog
                        </Link>
                        <Link className="navbar-item" to="/contact">
                            Contact
                        </Link>
                        <Link className="navbar-item" to="/contact/examples">
                            Form Examples
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
