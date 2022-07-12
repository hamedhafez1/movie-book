import React from 'react';
import axios from "axios";
import Layout from "../../components/Layout";

export default function Search({data, errorMessage}) {
    if (errorMessage || !data) {
        return <h4>{errorMessage || "an error occurred"}</h4>
    }
    return (
        <Layout>
            <div className="content">
                <ul>
                    {
                        data.results.map(item => {
                            return <li key={item.id}>{item.title}</li>
                        })
                    }
                </ul>
            </div>
        </Layout>
    );
}


export async function getServerSideProps(context) {
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

}