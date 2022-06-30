import Layout from "../components/Layout";
import MainBanner from "../components/MainBanner";

export default function Home() {

    return (
        <Layout title='MovieBook - Home'>
            <div>
                <MainBanner menuIndex={0}/>
                <MainBanner menuIndex={1}/>
                <MainBanner menuIndex={2}/>
                <MainBanner menuIndex={3}/>
            </div>
        </Layout>
    )
}