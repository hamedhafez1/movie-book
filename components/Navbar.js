import React from 'react';
import Link from "next/link";

function Navbar() {
    return (
        <nav>
            <div className="logo">
                <Link href={"/"}><a><img src="/movie-book.png" alt="" width={96}/></a></Link>
                {/*<h1><Link href="/"><a>MovieBook</a></Link></h1>*/}
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/about"><a>About</a></Link>
            <Link href="/movie"><a>Top Movies</a></Link>
        </nav>
    );
}

export default Navbar;