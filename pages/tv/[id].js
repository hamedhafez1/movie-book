import React, {useEffect, useState} from "react";
import Image from "next/image";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import {useRouter} from "next/router";

export default function Tv({data}) {

    if (data)
        return <Layout title={`MovieBook - ${data.fullTitle}`}>
            <main className={styles.main}>
                <div className={styles.movieImage}>
                    <Image loader={({src}) => (src)} src={data.image} alt={data.fullTitle}
                           width={176} height={265} unoptimized/>
                </div>
                <h2>{data.title}</h2>
                <strong>{data.year}</strong>
                <p><b>Director:</b> {data.directors || '-'}</p>
                {/*<h6>{data.releaseDate}</h6>*/}
                <p>{data.plot}</p>
                <div className={styles.moviesActorList}>
                    {data.actorList.map(actor => {
                        return <section className={styles.card} key={actor.id}>
                            <Image loader={({src}) => (src)} src={actor.image} key={actor.id} alt={actor.name}
                                   width={81} height={108} unoptimized loading="lazy"/>
                            <section>
                                <h5>{actor.name}</h5>
                                <span>as {actor.asCharacter}</span>
                            </section>
                        </section>
                    })}
                </div>
                <section>
                    <h3>similar:</h3>
                    <ul>
                        {data.similars.map(item => {
                            return <li key={item.id}>{item.title}({item.imDbRating})</li>
                        })}
                    </ul>
                </section>
            </main>
        </Layout>
    else return <Layout>No Data</Layout>

}

export async function getServerSideProps(context) {
    const result = await axios.get(`https://imdb-api.com/en/API/Title/k_4fjlegyk/${context.params.id}`)
    return {
        props: {
            data: result.data || undefined
        }
    }
}