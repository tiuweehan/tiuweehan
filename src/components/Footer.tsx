import { Link } from "gatsby"
import React from "react"

import logo from "../img/twh.svg"

const Footer: React.FC = () => {
    return (
        <footer className="footer footer-background has-text-white-ter">
            <div className="columns footer-background">
                <div className="container is-12 has-text-centered">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Kaldi"
                            style={{ width: "4em", height: "5em" }}
                        />
                    </Link>
                </div>
            </div>
            <div className="content footer-background has-text-centered has-text-white-ter">
                <div className="container has-text-white-ter">
                    <div className="columns">
                        <div
                            className="column is-12"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <section className="menu">
                                <ul
                                    className="menu-list"
                                    style={{ margin: "20px 0" }}
                                >
                                    <li>
                                        <Link className="navbar-item" to="/">
                                            <span className="navbar-menu-item">
                                                About
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-item"
                                            to="/experience"
                                        >
                                            <span className="navbar-menu-item">
                                                Experience
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="navbar-item"
                                            to="/blog"
                                        >
                                            <span className="navbar-menu-item">
                                                Blog
                                            </span>
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
