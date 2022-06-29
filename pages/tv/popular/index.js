import React from 'react';
import axios from "axios";
import Image from "next/image";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

function MostPopularTvs({data, errorMessage}) {

    const myLoader = ({src}) => {
        return src
    }

    if (errorMessage || !data) {
        return <Layout title="MovieBook - Most Popular Movie">
            <h4>{errorMessage || "an error occurred"}</h4>
        </Layout>
    }

    return (
        <Layout title="MovieBook - Most Popular Movie">
            <div className={styles.moviesList}>
                {
                    data.map((item) => {
                        return <Link href={"/tv/" + item.id} key={item.id}>
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
    );
}

export default MostPopularTvs;

export async function getServerSideProps(context) {
    return await axios.get(`https://imdb-api.com/en/API/MostPopularTVs/k_4fjlegyk`).then(result => {
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