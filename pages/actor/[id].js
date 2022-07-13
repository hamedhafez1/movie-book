import React from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import styles from "../../styles/Home.module.scss"


export default function Actor({data, errorMessage}) {
    console.log(data)
    if (errorMessage || !data) {
        return <h4>{errorMessage || "an error occurred"}</h4>
    }
    return (
        <Layout title={`${data.name} - MovieBook`}>
            <main className={styles.main}>
                <img src={data.image} width={176} height={265}/>
                <h1>{data.name}</h1>
                <span>{data.role}</span>
                <h3>{data.birthDate}</h3>
                <p>{data.summary}</p>
                <span>{data.awards}</span>
                <h3>Known For</h3>
                <div>
                    {data.knownFor.map(item => {
                        return <div className={styles.card} key={item.id}>
                            <h3>{item.fullTitle}</h3>
                            <span>{item.role}</span>
                        </div>
                    })}
                </div>
                <span>cast movie...</span>
            </main>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    console.log(context.query)
    return await axios.get(`https://imdb-api.com/en/API/Name/k_4fjlegyk/${context.query.id}`).then(result => {
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
}