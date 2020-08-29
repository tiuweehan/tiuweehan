import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import github from "../img/github-icon.svg"
import logo from "../img/logo.svg"

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
                        <img src={logo} alt="Kaldi" style={{ width: "88px" }} />
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
                    <div className="navbar-start has-text-centered">
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
                    <div className="navbar-end has-text-centered">
                        <a
                            className="navbar-item"
                            href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="icon">
                                <img src={github} alt="Github" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
