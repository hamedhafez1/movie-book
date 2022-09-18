import React, {useEffect, useState} from "react";


export default function ScrollUp() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return <>
        {showTopBtn &&
            <div className="scroll-up" onClick={goToTop}>
                <i className="arrow up"/>
            </div>
        }
    </>
}