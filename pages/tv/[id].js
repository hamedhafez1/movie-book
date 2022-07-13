import React, {useEffect, useState} from "react";
import Image from "next/image";
import axios from "axios";
import mainStyles from "../../styles/Home.module.scss";
import styles from "../../styles/Movie.module.scss";
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Tv({data}) {
    console.log(data)
    if (data)
        return <Layout title={`${data.fullTitle} - MovieBook`}>
            <main className={mainStyles.main}>
                <div className={styles.movieParent}>
                    <div className={styles.movieBanner}>
                        <div className={styles.movieImage}>
                            <Image loader={({src}) => (src)} src={data.image} alt={data.fullTitle}
                                   width={176} height={265} unoptimized/>
                        </div>
                    </div>
                    <h2>{data.title}</h2>
                    <span className={styles.year}>{data.year} . {data.contentRating} . {data.runtimeStr}</span>
                    <span className={styles.genres}>{data.genres}</span>
                    <span className={styles.director}><b>Director</b> {data.crew}</span>
                    {/*<small>{data.releaseDate.toString().replaceAll("-", "/")}</small>*/}
                    <p className={styles.plot}>{data.plot}</p>
                    <div className={styles.moviesActorList}>
                        {data.actorList.map(actor => {
                            return <div className={styles.actorCard} key={actor.id}>
                                <Link href={`/actor/${actor.id}`}>
                                    <div className={styles.actorImageWrapper}>
                                        <Image className={styles.actorImage}
                                               loader={({src}) => (src)}
                                               src={actor.image}
                                               alt={actor.name}
                                               width={100} height={100} unoptimized loading="lazy"/>
                                    </div>
                                </Link>
                                <div className={styles.actorNameBox}>
                                    <Link href={`/actor/${actor.id}`}>
                                        <a className={styles.actorName}>{actor.name}</a>
                                    </Link>
                                    <span className={styles.actorRoleName}>{actor.asCharacter}</span>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className={styles.similarMovies}>
                        <h3>More like this</h3>
                        <ul>
                            {data.similars.map(item => {
                                return <Link href={`/tv/${item.id}`} key={item.id}>
                                    <a>
                                        <li>{item.title}({item.imDbRating})</li>
                                    </a>
                                </Link>
                            })}
                        </ul>
                    </div>
                </div>
            </main>
        </Layout>
    else return <Layout>No Data</Layout>

}

export async function getServerSideProps(context) {
    const result = await axios.get(`https://imdb-api.com/en/API/Title/k_4fjlegyk/${context.params.id}`)
    return {
        props: {
            data: result.data || undefined
        }
    }
}