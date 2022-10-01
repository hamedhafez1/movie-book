import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="description" content="Generated by Roela Apps"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="manifest" href="/manifest.json"/>
                <meta name="theme-color" content="#FFC107"/>

                <link rel="apple-touch-startup-image" href="/icons/icon-96x96.png"/>
                <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png"/>

            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}