import React from "react";
import styles from "../../styles/Home.module.scss";
import axios from "axios";
import Layout from "../../components/Layout";
import MovieCard from "../../components/MovieCard";
import { GetServerSidePropsContext } from "next";
import { MovieObject } from "../../components/MovieObject";

type TopsMoviesProps = {
    data: Array<MovieObject>,
    errorMessage: string
}

export default function TopsMovies({ data, errorMessage }: TopsMoviesProps) {

    if (errorMessage || !data) {
        return <h4>{errorMessage || "an error occurred"}</h4>
    }

    return (
        <Layout title="Top 250 Movies - MovieBook">
            <main className={styles.main}>
                <div className={styles.moviesList}>
                    {
                        data.map((item: MovieObject) => {
                            return <MovieCard item={item} type="movie" key={item.id} />
                        })
                    }
                </div>
            </main>
        </Layout>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
