import React from 'react';
import Link from "next/link";

function Navbar() {

    const themeSwitch = () => {
        window.document.body.classList.toggle("light-theme")
    }

    return (
        <nav>
            <div className="nav">
                <input type="checkbox" id="nav-check"/>
                <div className="nav-header">
                    <div className="nav-title">
                        <Link href="/">
                            <a><h1 className="tracking-in-expand">Movie<span className="black-title">Book</span></h1>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span/>
                        <span/>
                        <span/>
                    </label>
                </div>

                <div className="nav-links">
                    <Link href="/"><a>Home</a></Link>
                    <Link href="/about"><a>About</a></Link>
                    <Link href="/movie"><a>Top Movies</a></Link>
                    <Link href="/index"><a>Top Tvs</a></Link>

                    <div className="dark-mode-control">
                        <label>Dark mode</label>
                        <div className="theme-switch" onClick={themeSwitch}>
                            <span className="switch"/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;