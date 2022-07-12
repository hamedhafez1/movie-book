import React, {useEffect} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import Layout from "../components/Layout";

function NotFound() {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push("/").catch(e => {
                console.log(e)
            });
        }, 3000)
    }, [router])

    return (
        <Layout title="404 Error Page - MovieBook">
            <div className="content not-found">
                <h1>😢</h1>
                <h2>That Page cannot be found</h2>
                <p>Go back the <Link href="/"><a>Homepage</a></Link></p>
            </div>
        </Layout>
    );
}

export default NotFound;