import React from 'react';
import Layout from "../components/Layout";

function About() {
    return (
        <Layout title="About us - MovieBook">
            <div className="content about-root tracking-in-expand">
                <h1 className="about-title">It<span>&apos;</span>s MovieBook</h1>
                <h2><span>Find Best</span> Movies <span>& </span>TV Series</h2>
                <h5>Developed by <a href="https://www.roela.ir" target="_blank" rel="noopener noreferrer">Roela Apps</a>
                </h5>
                <small>All Data is Received From <a href="https://imdb.com" target="_blank" rel="noopener noreferrer">IMDb</a> Programming API</small>
            </div>
        </Layout>
    );
}

export default About;