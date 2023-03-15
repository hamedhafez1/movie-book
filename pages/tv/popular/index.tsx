import React from 'react';
import axios from "axios";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.scss";
import MovieCard from "../../../components/MovieCard";
import {MovieObject} from "../../../components/MovieObject";
import {GetServerSidePropsContext} from "next";

type MostPopularTvsProps = {
    data: Array<MovieObject>,
    errorMessage: string
}

function MostPopularTvs({data, errorMessage}: MostPopularTvsProps) {

    if (errorMessage || !data) {
        return <Layout title="Most Popular Movie - MovieBook">
            <h4>{errorMessage || "an error occurred"}</h4>
        </Layout>
    }

    return (
        <Layout title="Most Popular Movie - MovieBook">
            <div className={styles.moviesList}>
                {
                    data && data.map((item) => {
                        return <MovieCard item={item} type="tv" key={item.id}/>
                    })
                }
            </div>
        </Layout>
    );
}

export default MostPopularTvs;

export async function getServerSideProps(context: GetServerSidePropsContext) {
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