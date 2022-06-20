import styles from '../styles/Home.module.css'
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {

    return (
        <Layout>
            <div className={styles.container}>
                <main className={styles.main}>
                    <Link href={"/movie"}>
                        <a>Top 250 Movie</a>
                    </Link>
                </main>
            </div>
        </Layout>
    )
}