import { Link } from "gatsby"
import React from "react"

import logo from "../img/twh.svg"

const Footer: React.FC = () => {
    return (
        <footer className="footer footer-background has-text-white-ter">
            <div className="columns footer-background">
                <div className="container is-12 has-text-centered">
                    <img
                        src={logo}
                        alt="Kaldi"
                        style={{ width: "4em", height: "5em" }}
                    />
                </div>
            </div>
            <div className="content footer-background has-text-centered has-text-white-ter">
                <div className="container has-text-white-ter">
                    <div className="columns">
                        <div className="column is-4">
                            <section className="menu">
                                <ul className="menu-list">
                                    <li>
                                        <Link to="/" className="navbar-item">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-item"
                                            to="/about"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-item"
                                            to="/products"
                                        >
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-item"
                                            to="/contact/examples"
                                        >
                                            Form Examples
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            className="navbar-item"
                                            href="/admin/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Admin
                                        </a>
                                    </li>
                                </ul>
                            </section>
                        </div>
                        <div className="column is-4">
                            <section>
                                <ul className="menu-list">
                                    <li>
                                        <Link
                                            className="navbar-item"
                                            to="/blog"
                                        >
                                            Latest Stories
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-item"
                                            to="/contact"
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
