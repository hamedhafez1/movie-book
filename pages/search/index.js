import React from 'react';
import axios from "axios";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import {useRouter} from "next/router";

export default function Search({data, errorMessage}) {
    const router = useRouter()
    if (errorMessage || !data || data.results.length < 1) {
        setTimeout(() => router.replace("/"), 2000)
        return <Layout>
            <h4>{errorMessage || "an error occurred"}</h4>
        </Layout>
    }
    return (
        <Layout>
            <div className="content">
                <div className={styles.moviesList}>
                    {
                        data.results.map(item => {
                            return <div key={item.id}>
                                <Link href={`/movie/${item.id}`}>
                                    <div className={styles.card}>
                                        <div className={styles.imgSection}>
                                            <Image loader={({src}) => (src)}
                                                   src={item.image} width={105} height={140}
                                                   unoptimized
                                                   alt={item.title}/>
                                        </div>
                                        <div className={styles.cardDesc}>
                                            <h4>{item.title}</h4>
                                            <section>
                                                <p>{item.description}</p>
                                            </section>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>
        </Layout>
    );
}


export async function getServerSideProps(context) {
    if (context.query.q.length > 0) {
        return await axios.get(`https://imdb-api.com/en/API/Search/k_4fjlegyk/${context.query.q}`).then(result => {
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
    } else return {
        props: {
            data: [],
            errorMessage: "no input for searching"
        }
    }
}