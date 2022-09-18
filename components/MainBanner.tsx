import React from 'react'
import Link from 'next/link'
import styles from '../styles/MainBanner.module.css'

const MainItems = [
    {title: "Top 250 Movies", href: "/movie", className: styles.mainBannerMovies},
    {title: "Top 250 TVs", href: "/tv", className: styles.mainBannerTVs},
    {title: "Most Popular Movies", href: "/movie/popular", className: styles.mainBannerPopularMovies},
    {title: "Most Popular TVs", href: "/tv/popular", className: styles.mainBannerPopularTVs},
]

interface MainBannerProps {
    menuIndex: number
}

export default function MainBanner({menuIndex = 0} : MainBannerProps) {

    return (
        <div className={styles.mainBanner}>
            <Link href={MainItems[menuIndex].href}>
                <div className={MainItems[menuIndex].className}>
                    <h3 className={styles.title}>{MainItems[menuIndex].title}</h3>
                </div>
            </Link>
        </div>
    )
}
