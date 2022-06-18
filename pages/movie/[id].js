import React from "react";
import Image from "next/image";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";

export default function Movie({data = []}) {
    if (data !== [])
        return <Layout>
            <main className={styles.main}>
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
                            <h4>{actor.name}</h4>
                            <label>as Character:</label>
                            <section>{actor.asCharacter}</section>
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