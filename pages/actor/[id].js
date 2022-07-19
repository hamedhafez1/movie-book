import React from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import mainStyles from "../../styles/Home.module.scss"
import styles from "../../styles/Movie.module.scss"
import Image from "next/image";
import Link from "next/link";


export default function Actor({data, errorMessage}) {
    // console.log(data)
    if (errorMessage || !data) {
        return <h4>{errorMessage || "an error occurred"}</h4>
    }
    return (
        <Layout title={`${data.name} - MovieBook`}>
            <div className={styles.actorParent}>
                <div className={styles.movieBanner}>
                    <div className={styles.movieImage}>
                        <Image loader={({src}) => (src)} src={data.image} width={176} height={265} alt={data.name}
                               unoptimized/>
                    </div>
                </div>
                <h2>{data.name}</h2>
                <span
                    className={styles.actorBirthDate}><b>Born: </b>{data.birthDate.toString().replaceAll("-", "/")}</span>
                <span className={styles.genres}>{data.role}</span>
                <p>{data.summary}</p>
                <span>{data.awards}</span>
                <h3>Known For</h3>
                <div className={styles.actorMovies}>
                    {data.knownFor.map(item => {
                        return <Link href={`/movie/${item.id}`} key={item.id}>
                            <div className={styles.actorMoviesCardContent}>
                                <Image src={item.image} alt={item.fullTitle} width={105} height={140} unoptimized/>
                                <small>{item.fullTitle}</small>
                                <small>{item.role}</small>
                            </div>
                        </Link>
                    })}
                </div>
                <span>cast movie...</span>
                <h6>coming soon😉</h6>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    return await axios.get(`https://imdb-api.com/en/API/Name/k_4fjlegyk/${context.query.id}`).then(result => {
        return {
            props: {
                data: result.data
            }
        }
    }).catch(e => {
        console.error(e.message)
        return {
            props: {
                data: [],
                errorMessage: e.message
            }
        }
    })
}