import Layout from "../../shared/components/layout/Layout"
import css from '../../shared/css/editProfile.scss'
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
                <div className={css.editProfile_container}>
                    <div className={css.leftSide}>
                        <div className={css.params}>
                            <div className={css.title}>
                                Paramètres du compte
                        </div>
                            <div className={css.input_container}>
                                <input className={css.input} type="text" placeholder="Nom et Prénom" />
                                <input className={css.input} type="email" placeholder="Email" />
                                <input className={css.input} type="text" placeholder="Address" />
                                <input className={css.input} type="text" placeholder="Phone Number" />
                                <input className={css.input} type="text" placeholder="Current Club" />
                                <input className={css.input} type="text" placeholder="Facebook Link" />
                            </div>
                        </div>
                        <div className={css.experience_container}>
                            <div className={css.title}>
                                Expérience et clubs
                        </div>
                            <div className={css.experience}>
                                <div className={css.exp_label}>Experience 1 :</div>
                                <div className={css.input_container}>
                                    <input className={css.input} type="text" placeholder="Club Name" />
                                    <input className={css.input} type="date" placeholder="Date" />
                                    <textarea className={css.input} rows="10" placeholder="Description" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={css.rightSide}>
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
