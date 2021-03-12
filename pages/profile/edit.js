import Layout from "../../shared/components/layout/Layout"
import  '../../shared/css/editProfile.scss'
import Head from "next/head";
import { i18n, withTranslation } from '../../i18n'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import cookies from 'next-cookies'
import Axios from "axios";

const EditProfile = (props) => {
    // useEffect(() => {
    //     console.log('props: ', props);
    //     // props.loggedIn === false && Router.push("/login")   
    // }, [])
    const [userInformation, setUserInformation] = useState({})

    useEffect(() => {
        console.log('props: ', props);
        Axios.get('https://api.isporit.com/auth/me', { withCredentials: true }).then(res => setUserInformation(res.data)).catch(e => Router.push("/login"))
    }, [])


    return (
        <div>
            <Head>
                <title>Edit profile</title>
                <link rel="icon" href="/logo.png" />

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Sporit Home page " />
                <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
                <meta name="author" content="sporit" />
            </Head>
            <Layout>
                <div className={"editProfile_container"}>
                    <div className={"leftSide"}>
                        <div className={"params"}>
                            <div className={"title"}>
                                Paramètres du compte
                        </div>
                            <div className={"input_container"}>
                                <input className={"input"} type="text" placeholder="Nom et Prénom" />
                                <input className={"input"} type="email" placeholder="Email" />
                                <input className={"input"} type="text" placeholder="Address" />
                                <input className={"input"} type="text" placeholder="Phone Number" />
                                <input className={"input"} type="text" placeholder="Current Club" />
                                <input className={"input"} type="text" placeholder="Facebook Link" />
                            </div>
                        </div>
                        <div className={"experience_container"}>
                            <div className={"title"}>
                                Expérience et clubs
                        </div>
                            <div className={"experience"}>
                                <div className={"exp_label"}>Experience 1 :</div>
                                <div className={"input_container"}>
                                    <input className={"input"} type="text" placeholder="Club Name" />
                                    <input className={"input"} type="date" placeholder="Date" />
                                    <textarea className={"input"} rows="10" placeholder="Description" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={"rightSide"}>
                        <img src='/espaceCoach.svg' />
                    </div>
                </div>

            </Layout>
        </div>
    )


}


EditProfile.getInitialProps = async (ctx) => {

    return ({
        namespacesRequired: ['common'],
    })
}

export default withTranslation('common')(EditProfile);
