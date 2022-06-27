import React from 'react';
import Link from "next/link";
import Image from "next/image";

function Navbar() {
    return (
        <nav>
            <div className="logo">
                <Link href="/">
                    <a><Image src="/movie-book.png" alt="" width={96} height={32} unoptimized/></a>
                </Link>
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/about"><a>About</a></Link>
            <Link href="/movie"><a>Top Movies</a></Link>
        </nav>
    );
}

export default Navbar;