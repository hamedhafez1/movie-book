import React from 'react';

function Footer() {
    return (
        <footer>
            <small>
                © {new Date().getFullYear()}
                {' '}
                <a href="https://www.roela.ir" target="_blank" rel="noreferrer"><b>Roela Apps</b></a>
            </small>
        </footer>
    );
}

export default Footer;