import React from "react";
import Image from "next/image";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Movie({data}) {

    if (data !== [])
        return <main className={styles.main}>
            <Link href="/"><a>Home</a></Link>
            <Link href="/movie"><a>Movies</a></Link>
            <Image loader={({src}) => (src)} src={data.image} alt={data.fullTitle} width={176} height={265}
                   unoptimized/>
            <h1>{data.title}</h1>
            <span>{data.year}</span>
            {/*<h6>{data.releaseDate}</h6>*/}
            <p>{data.plot}</p>
            <p><b>Director:</b> {data.directors}</p>
            <div className={styles.moviesList}>
                {
                    data.actorList.map(actor => {
                        return <section className={styles.card} key={actor.id}>
                            <Image loader={({src}) => (src)} src={actor.image} key={actor.id} alt={actor.name}
                                   width={128} height={176} unoptimized/>
                            <h3>{actor.name}</h3>
                            <b>as Character:</b><p>{actor.asCharacter}</p>
                        </section>
                    })
                }
            </div>
        </main>
    else return <>No Data</>
}

export async function getServerSideProps(context) {
    console.info(context.params)
    const result = await axios.get(`https://imdb-api.com/en/API/Title/k_4fjlegyk/${context.query.id}`)
    return {
        props: {
            data: result.data || []
        }
    }
}