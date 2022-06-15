import React from "react";
import Image from "next/image";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Movie({data = []}) {
    if (data !== [])
        return <main className={styles.main}>
            <Link href="/"><a>Home</a></Link>
            <Link href="/movie"><a>Movies</a></Link>
            <div className={styles.movieImage}>
                <Image loader={({src}) => (src)} src={data.image} alt={data.fullTitle}
                       width={176} height={265} unoptimized/>
            </div>
            <h2>{data.title}</h2>
            <strong>{data.year}</strong>
            <p><b>Director:</b> {data.directors}</p>
            {/*<h6>{data.releaseDate}</h6>*/}
            <p>{data.plot}</p>
            <div className={styles.moviesList}>
                {data.actorList.map(actor => {
                    return <section className={styles.card} key={actor.id}>
                        <Image loader={({src}) => (src)} src={actor.image} key={actor.id} alt={actor.name}
                               width={128} height={176} unoptimized/>
                        <h3>{actor.name}</h3>
                        <b>as Character:</b><p>{actor.asCharacter}</p>
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
    else
        return <>No Data</>
}

export async function getServerSideProps(context) {
    const result = await axios.get(`https://imdb-api.com/en/API/Title/k_4fjlegyk/${context.query.id}`)
    return {
        props: {
            data: result.data || []
        }
    }
}

// export async function getStaticProps(context) {
//     const id = context.params.id
//     const res = await axios.get("https://imdb-api.com/en/API/Title/k_4fjlegyk/" + id)
//     const data = res.data
//     return {
//         props: {data: data}
//     }
// }
//
// export async function getStaticPaths() {
//     const res = await axios.get("https://imdb-api.com/en/API/Top250Movies/k_4fjlegyk");
//     const data = res.data.items
//
//     const paths = data.map(item => {
//         return {
//             params: {id: item.id.toString()}
//         }
//     })
//     return {
//         paths, fallback: false
//     }
//
// }