import React, {useEffect} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";

function NotFound() {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 3000)
    }, [router])

    return (
        <div className="not-found">
            <h1>😢</h1>
            <h2>That Page cannot be found</h2>
            <p>Go back the <Link href="/"><a>Homepage</a></Link></p>
        </div>
    );
}

export default NotFound;