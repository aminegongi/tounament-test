import Head from "next/head";
import Layout from "../../shared/components/layout/Layout";
import { useRouter } from "next/router";
import css from '../../shared/css/profile-page.scss'
import dynamic from 'next/dynamic'
import ProfilePage from "../../shared/components/profilePage/ProfilePage";
import ClubProfile from "../../shared/components/ClubProfile/ClubProfile";
const PrintButton = dynamic(() => import('../../shared/components/printPage/PrintButton'), { ssr: false });
const Page = dynamic(() => import('../../shared/components/printPage/Page'), { ssr: false });

const Index = () => {
    const router = useRouter();

  
    return (
        <div >
            <Head>
                <title>{router.query.id}</title>
                <link rel="icon" href="/logo.png" />

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Sporit Home page " />
                <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
                <meta name="author" content="sporit" />
            </Head>

            

            {/* <ClubProfile router={router} /> */}
            <Layout>
                <ProfilePage router={router} />
            </Layout>
        </div>
    )
};

export default Index;
