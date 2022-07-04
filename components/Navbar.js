import React from 'react';
import Link from "next/link";
import Image from "next/image";

function Navbar() {

    const themeSwitch = () => {
        window.document.body.classList.toggle("light-theme")
    }

    return (
        <nav className="nav">
            <input type="checkbox" id="nav-check"/>
            <div className="nav-header">
                <div className="nav-title">
                    <Link href="/">
                        <a><Image src="/movie-book.png" alt="" width={96} height={32} unoptimized/></a>
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
                <Link href="/tv"><a>Top Tvs</a></Link>

                <div className="theme-switch" onClick={themeSwitch}>
                    <span className="switch"/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;