import React from "react";
import styles from "../../styles/Home.module.scss";
import axios from "axios";
import Layout from "../../components/Layout";
import MovieCard from "../../components/MovieCard";
import {MovieObject} from "../../components/MovieObject";
import {GetServerSidePropsContext} from "next";

type TopTVsProps = {
    data: Array<MovieObject>,
    errorMessage: string
}

export default function TopTVs({data, errorMessage}: TopTVsProps) {

    if (errorMessage || !data) {
        return <h4>{errorMessage || "an error occurred"}</h4>
    }

    return (
        <Layout title="Top 250 Tvs - MovieBook">
            <div className={styles.moviesList}>
                {
                    data && data.map((item) => {
                        return <MovieCard item={item} type="tv" key={item.id}/>
                    })
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
