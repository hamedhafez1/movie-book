import Layout from "../components/Layout";
import MainBanner from "../components/MainBanner";
import SearchTitle from "../components/SearchTitle";

export default function Home() {

    return (
        <Layout title='MovieBook'>
            <div className="content">
                <SearchTitle/>
                <MainBanner menuIndex={0}/>
                <MainBanner menuIndex={1}/>
                <MainBanner menuIndex={2}/>
                <MainBanner menuIndex={3}/>
            </div>
        </Layout>
    )
}