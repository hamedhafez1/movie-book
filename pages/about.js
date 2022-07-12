import React from 'react';
import Layout from "../components/Layout";

function About() {
    return (
        <Layout title="About us - MovieBook">
            <div className="content about-root">
                <h4>Developed by <a href="https://www.roela.ir" target="_blank" rel="noopener noreferrer">Roela Apps</a>
                </h4>
                <small>all data from <a href="https://imdb.com" target="_blank" rel="noopener noreferrer">imdb.com</a> programming api</small>
            </div>
        </Layout>
    );
}

export default About;