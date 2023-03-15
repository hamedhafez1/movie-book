import React from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import styles from "../../styles/Movie.module.scss"
import Image from "next/image";
import Link from "next/link";
import {GetServerSidePropsContext} from "next";
import {MovieObject} from "../../components/MovieObject";
import {useRouter} from "next/router";

interface ActorItem {
    id: string,
    name: string,
    image: string,
    role: string,
    summary: string,
    birthDate: string,
    awards: string,
    knownFor: MovieObject[],
    castMovies: MovieObject[]
}

type ActorProps = {
    data: ActorItem,
    errorMessage: string
}


export default function Actor({data, errorMessage}: ActorProps) {
    const router = useRouter()
    if (errorMessage || !data) {
        setTimeout(() => router.push("/"), 1500)
        return <h4>{errorMessage || "an error occurred"}</h4>
    }
    return (
        <Layout title={`${data.name} - MovieBook`}>
            <div className={styles.actorParent}>
                <div className={styles.movieBanner}>
                    <div className={styles.movieImage}>
                        <Image loader={({src}) => (src)} src={data.image} width={199} height={265} alt={data.name}
                               unoptimized/>
                    </div>
                </div>
                <h2 className={styles.actorName}>{data.name}</h2>
                <span className={styles.genres}>{data.role}</span>
                <p className={styles.actorSummary}>{data.summary}</p>
                <span
                    className={styles.actorBirthDate}><b>Born: </b>{data.birthDate.toString().replaceAll("-", "/")}</span>
                <span className={styles.actorAwards}>{data.awards}</span>
                <div className={styles.actorKnownFor}>
                    <span>Known For</span>
                    <div className={styles.actorMovies}>
                        {
                            data.knownFor && data.knownFor.map(item => {
                                return <Link href={`/movie/${item.id}`} key={item.id}>
                                    <div className={styles.actorMoviesCardContent}>
                                        <Image src={item.image} alt={item.fullTitle} width={105} height={140} unoptimized/>
                                        <div className={styles.actorMoviesTitleParent}>
                                            <span className={styles.actorMoviesTitle}>{item.fullTitle}</span>
                                            <span className={styles.actorMoviesRole}>{item.role}</span>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>
                <div className={styles.casts}>
                    <span>Filmography</span>
                    <table className={styles.castMoviesTable}>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Role</th>
                            <th>Year</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.castMovies && data.castMovies.map((item, index) => {
                                return <tr key={item.id + index}>
                                    <td>{item.title}</td>
                                    <td>{item.role}</td>
                                    <td>{item.year || "-"}</td>
                                    <td>{item.description}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await axios.get(`https://imdb-api.com/en/API/Name/k_4fjlegyk/${context.query.id}`).then(result => {
        if (!result.data.errorMessage) {
            return {
                props: {
                    data: result.data
                }
            }
        } else return {
            props: {
                data: null,
                errorMessage: result.data.errorMessage
            }
        }
    }).catch(e => {
        console.error(e.message)
        return {
            props: {
                data: null,
                errorMessage: e.message
            }
        }
    })
}