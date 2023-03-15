import React from "react";
import Image from "next/image";
import axios from "axios";
import mainStyles from "../../styles/Home.module.scss";
import styles from "../../styles/Movie.module.scss";
import Layout from "../../components/Layout";
import Link from "next/link";
import {GetServerSidePropsContext} from "next";
import {MovieObject} from "../../components/MovieObject";

type TVProps = {
    data: MovieObject
}

export default function Tv({data}: TVProps) {

    if (data)
        return <Layout title={`${data.fullTitle} - MovieBook`}>
            <main className={mainStyles.main}>
                <div className={styles.movieParent}>
                    <div className={styles.movieBanner}>
                        <div className={styles.movieImage}>
                            <Image loader={({src}) => (src)} src={data.image} alt={data.fullTitle}
                                   width={200} height={300} unoptimized/>
                        </div>
                    </div>
                    <h2>{data.title}</h2>
                    <span className={styles.yearParent}>
                        <span className={styles.year}>{data.year}</span>
                        <GetContentRating content={data.contentRating}/>
                        <GetContentRating content={data.runtimeStr}/>
                        <GetContentRating content={data.imDbRating}>
                            <span className={styles.imdbRate}>&#9733;</span>
                        </GetContentRating>
                    </span>
                    <span className={styles.genres}>{data.genres}</span>
                    <span className={styles.director}><span>Creators: </span> {data.tvSeriesInfo.creators}</span>
                    <span className={styles.releaseDate}>{data.releaseDate.toString().replaceAll("-", "/")}</span>
                    <p className={styles.plot}>{data.plot}</p>
                    <div className={styles.moviesActorList}>
                        {data.actorList && data.actorList.map((actor: any) => {
                            return <div className={styles.actorCard} key={actor.id}>
                                <Link href={`/actor/${actor.id}`}>
                                    <div className={styles.actorImageWrapper}>
                                        <Image className={styles.actorImage}
                                               loader={({src}) => (src)}
                                               src={actor.image}
                                               alt={actor.name}
                                               width={75} height={100} unoptimized loading="lazy"/>
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
                            {data.similar && data.similar.map((item: any) => {
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

const GetContentRating = (props: any) => {
    if (!props.content) {
        return <></>
    }
    return <span> . {props.children}{props.content}</span>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const result = await axios.get(`https://imdb-api.com/en/API/Title/k_4fjlegyk/${context.params?.id}`)
    return {
        props: {
            data: result.data || undefined
        }
    }
}