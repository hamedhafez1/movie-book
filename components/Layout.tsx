import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import {useRouter} from "next/router";
import NProgress from "nprogress";
import ScrollUp from "./ScrollUp";

type LayoutProps = {
    title?: string ,
    children?: React.ReactNode
}

function Layout({title = "MovieBook", children} : LayoutProps) {

    const router = useRouter()

    useEffect(() => {
        const handleStart = (url:string) => {
            // console.log(`Loading: ${url}`)
            NProgress.start()
        }
        const handleStop = () => {
            NProgress.done()
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
                {/*<meta name="description" content="Generated by Roela Apps"/>*/}
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0 ,maximum-scale=1.0, user-scalable=no,viewport-fit=cover"/>
                {/*<link rel="icon" href="/favicon.ico"/>*/}
                {/*<link rel="manifest" href="/manifest.json"/>*/}
            </Head>
            <div className="container">
                <Navbar/>
                <main className="main">
                    {children}
                </main>
                <Footer/>
            </div>
            <ScrollUp/>
        </React.Fragment>
    );
}

export default Layout;