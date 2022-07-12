import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import Link from "next/link";
import axios from "axios";
import Layout from "../../components/Layout";

export default function TopsMovies({data, errorMessage}) {

    const myLoader = ({src}) => {
        return src
    }

    if (errorMessage || !data) {
        return <h4>{errorMessage || "an error occurred"}</h4>
    }

    return (
        <Layout title="Top 250 Movies - MovieBook">
            <main className={styles.main}>
                <div className={styles.moviesList}>
                    {
                        data.map((item) => {
                            return <Link
                                href={"/movie/" + item.id
                                    // {
                                    // pathname: "/movie/[movie_id]",
                                    // pathname: "/movie/",
                                    // query: {id: item.id}
                                    // }
                                } key={item.id}>
                                <section className={styles.card} key={item.id}>
                                    <section className={styles.imgSection}>
                                        <Image loader={myLoader} src={item.image} width={72} height={96} unoptimized
                                               alt={item.title}/>
                                    </section>
                                    <section className={styles.cardDesc}>
                                        <h4>{item.rank}.{item.fullTitle}</h4>
                                        <section>
                                            {/*<b>crew:</b>*/}<p>{item.crew}</p>
                                        </section>
                                        <section>
                                            <b className="imdbRate">&#9733;</b><span>{item.imDbRating}</span>
                                        </section>
                                    </section>
                                </section>
                            </Link>
                        })
                    }
                </div>
            </main>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    return await axios.get(`https://imdb-api.com/en/API/Top250Movies/${process.env.IMDB_TOKEN}`).then(result => {
        if (result.data.items.length === 250)
            return {
                props: {
                    data: result.data.items
                }
            }
        else return {
            props: {
                data: null,
                errorMessage: result.data.errorMessage
            }
        }
    }).catch(e => {
        return {
            props: {
                data: null,
                errorMessage: e.message
            }
        }
    })
}
