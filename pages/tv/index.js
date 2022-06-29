import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import Layout from "../../components/Layout";


export default function TopTVs({ data, errorMessage }) {
    console.log(data)

    if (errorMessage || !data) {
        return <h4>{errorMessage || "an error occurred"}</h4>
    }

    return (
        <Layout title="MovieBook - Top 250 Tvs">
            <div className={styles.moviesList}>
                {
                    data.map((item) => {
                        return <Link
                            href={"/tv/" + item.id
                                // {
                                // pathname: "/movie/[movie_id]",
                                // pathname: "/movie/",
                                // query: {id: item.id}
                                // }
                            } key={item.id}>
                            <section className={styles.card} key={item.id}>
                                <Image src={item.image} width={128} height={176} unoptimized alt={item.title}/>
                                <h3>{item.title}</h3>
                                <b>crew:</b><p>{item.crew}</p>
                                <b>imdb rate:</b><p>{item.imDbRating}</p>
                                <b>rank:</b><p>{item.rank}</p>
                                <b>year:</b><p>{item.year}</p>
                            </section>
                        </Link>
                    })
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    return await axios.get(`https://imdb-api.com/en/API/Top250TVs/k_4fjlegyk`).then(result => {
        if (result.data.items.length > 1)
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
