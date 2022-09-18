import React from "react";
import Image from "next/image";
import axios from "axios";
import mainStyles from "../../styles/Home.module.scss";
import styles from "../../styles/Movie.module.scss";
import Layout from "../../components/Layout";
import Link from "next/link";
import {GetServerSidePropsContext} from "next";
import {MovieObject} from "../../components/MovieObject";
import {useRouter} from "next/router";

type MovieProps = {
    data: MovieObject,
    errorMessage: string
}

export default function Movie({data, errorMessage}: MovieProps) {
    const router = useRouter()
    if (errorMessage || data.title!) {
        setTimeout(() => router.push("/"), 1500)
        return <h4>{errorMessage || "an error occurred"}</h4>
    }
    // const [data, setData] = useState(null)
    //
    //
    // useEffect(() => {
    //     const getMovieData = () => {
    //         axios.get(`https://imdb-api.com/en/API/Title/k_4fjlegyk/${router.query.id}`).then(result => {
    //             if (result.data.title) {
    //                 setData(result.data)
    //             }
    //         }).catch(e => {
    //             console.error(e)
    //             setData(null)
    //         })
    //     }
    //     getMovieData()
    //     return () => {
    //         setData(null)
    //     }
    // }, [router])

    if (data) {
        return <Layout title={`${data.fullTitle} - MovieBook`}>
            <main className={mainStyles.main}>
                <div className={styles.movieParent}>
                    <div className={styles.movieBanner}>
                        <div className={styles.movieImage}>
                            {/*<img src={data.image} alt=""/>*/}
                            <Image loader={({src}) => (src)} src={data.image} alt={data.fullTitle}
                                   width={200} height={300} unoptimized/>
                            {/*width={177} height={265} unoptimized/>*/}
                        </div>
                    </div>
                    <h2>{data.title}</h2>
                    <span className={styles.yearParent}>
                        <span className={styles.year}>{data.year}</span>
                        <GetContentRating content={data.contentRating}/>
                        <GetContentRating content={data.runtimeStr}/>
                    </span>
                    <span className={styles.genres}>{data.genres}</span>
                    <span className={styles.director}><span>Director: </span> {data.directors}</span>
                    <span className={styles.releaseDate}>{data.releaseDate.toString().replaceAll("-", "/")}</span>
                    <p className={styles.plot}>{data.plot}</p>
                    <div className={styles.moviesActorList}>
                        {
                            data.actorList.map((actor: any) => {
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
                            })
                        }
                    </div>
                    <div className={styles.similarMovies}>
                        <h3>More like this</h3>
                        <ul>
                            {data.similars.map((movie: MovieObject) => {
                                return <Link href={`/movie/${movie.id}`} key={movie.id}>
                                    <a>
                                        <li>{movie.title}({movie.imDbRating})</li>
                                    </a>
                                </Link>
                            })}
                        </ul>
                    </div>
                </div>
            </main>
        </Layout>
    } else {
        return <Layout>
            <h1>No Data!</h1>
        </Layout>
    }
}

const GetContentRating = (content: any) => {
    if (!content) {
        return <></>
    }
    return <span>. {content}</span>
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await axios.get(`https://imdb-api.com/en/API/Title/k_4fjlegyk/${context.query.id}`).then(result => {
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

// export async function getStaticPaths() {
//     const res = await axios.get("https://imdb-api.com/en/API/Top250Movies/k_4fjlegyk");
//     const data = res.data.items
//
//     const paths = data.map(item => {
//         return {
//             params: {id: item.id.toString()}
//         }
//     })
//     return {
//         paths,
//         fallback: false
//     }
//
// }
//
// export async function getStaticProps(context) {
//     const id = context.params.id
//     const res = await axios.get("https://imdb-api.com/en/API/Title/k_4fjlegyk/" + id)
//     const data = res.data
//     return {
//         props: {data: data}
//     }
// }