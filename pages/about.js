import React from 'react';
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";

function About(props) {
    return (
        <Layout>
            <main className={styles.main}>
                <h3>Developed by Roela Apps</h3>
            </main>
        </Layout>
    );
}

export default About;