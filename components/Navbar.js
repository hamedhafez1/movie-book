import React from 'react';
import Link from "next/link";

function Navbar(props) {
    return (
        <nav>
            <div className="logo">
                <h1>MovieBook</h1>
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/about"><a>About</a></Link>
            <Link href="/movie"><a>Top Movies</a></Link>
        </nav>
    );
}

export default Navbar;