import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import Layout from "../../components/Layout";

export default function TopsMovies({data = []}) {

    const myLoader = ({src, width, quality}) => {
        return src
    }

    return (
        <Layout title="MovieBook - Top 250 Movie">
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
                                <Image loader={myLoader} src={item.image} width={128} height={176} unoptimized
                                       alt={item.title}/>
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

export function getServerSideProps(context) {

    return axios.get("https://imdb-api.com/en/API/Top250Movies/k_4fjlegyk").then(result => {
        return {
            props: {
                data: result.data.items
            }
        }
    }).catch(e => {
        // console.error(e)
        return {
            props: {
                data: []
            }
        }
    })


}
