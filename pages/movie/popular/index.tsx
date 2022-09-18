import React from 'react';
import axios from "axios";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.scss";
import MovieCard from "../../../components/MovieCard";
import {MovieObject} from "../../../components/MovieObject";
import {GetServerSidePropsContext} from "next";
import {useRouter} from "next/router";

type MostPopularMoviesProps = {
    data: Array<MovieObject>,
    errorMessage: string
}

function MostPopularMovies({data, errorMessage}: MostPopularMoviesProps) {

    const router = useRouter()

    if (errorMessage || !data) {
        setTimeout(() => router.push("/"), 1500)
        return <Layout title="Most Popular Movie - MovieBook">
            <h4>{errorMessage || "an error occurred"}</h4>
        </Layout>
    }

    return (
        <Layout title="Most Popular Movies - MovieBook">
            <div className={styles.moviesList}>
                {
                    data.map((item) => {
                        return <MovieCard item={item} type="movie" key={item.id}/>
                    })
                }
            </div>
        </Layout>
    );
}

export default MostPopularMovies;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await axios.get(`https://imdb-api.com/en/API/MostPopularMovies/k_4fjlegyk`).then(result => {
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