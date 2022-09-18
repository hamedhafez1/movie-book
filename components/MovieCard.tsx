import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import { MovieObject } from "./MovieObject";


type MovieBookProps = {
    item: MovieObject,
    type: 'movie' | 'tv'
}

export default function MovieCard({ item, type = "movie" }: MovieBookProps) {
    const myLoader = ({ src }: any) => {
        return src
    }
    return <Link
        href={`/${type}/${item.id}`
            // {
            // pathname: "/movie/[movie_id]",
            // pathname: "/movie/",
            // query: {id: item.id}
            // }
        } key={item.id}>
        <section className={styles.card} key={item.id}>
            <section className={styles.imgSection}>
                <Image loader={myLoader} src={item.image} width={105} height={140} unoptimized
                    alt={item.title} />
            </section>
            <section className={styles.cardDesc}>
                <h4>{item.rank}.{item.fullTitle}</h4>
                <section>
                    <p>{item.crew}</p>
                </section>
                <section>
                    <b className="imdbRate">&#9733;</b><span>{item.imDbRating}</span>
                </section>
            </section>
        </section>
    </Link>
}
