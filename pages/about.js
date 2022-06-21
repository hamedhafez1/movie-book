import React from 'react';
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";

function About(props) {
    return (
        <Layout title="MovieBook - About us">
            <main className={styles.main}>
                <h3>Developed by Roela Apps</h3>
                <a href="https://www.roela.ir" target="_blank" rel="noopener noreferrer">Website</a>
            </main>
        </Layout>
    );
}

export default About;