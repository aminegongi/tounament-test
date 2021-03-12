import getConfig from "next/config";
import Head from "next/head"
import  '../shared/css/login.scss'
import { useState } from 'react'
import Link from "next/link"
import { isEmpty, isNumber } from 'lodash'
import { useRouter } from 'next/router'
import Axios from "axios"
import Layout from "../shared/components/layout/Layout";
import { useEffect } from "react";

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
}
const { publicRuntimeConfig } = getConfig();

const ForgotPassword = (props) => {
    const router = useRouter()
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')
    const [localErrors, setLocalErrors] = useState({ wrongEmailOrPassword: false, verifyYourAccount: router.query.verifyEmail === 'true' || false })

    const {
        redirectTo = publicRuntimeConfig.LOGIN_REDIRECT_URL,
        env = "prod"
    } = router.query;
    const apiUrl = publicRuntimeConfig[`${env.toUpperCase()}_API_URL`];
    const resetPasswordApiUrl = apiUrl + "/auth/passwordReset";

    if (!apiUrl) {
        console.error("Missing API URL for this environment");
    }
    console.log('router.query.token: ', router.query.token);
    useEffect(() => {
        if (isEmpty(router.query.token)) {
            window.location.href = `/login`
            
        }
    }, [])
    const onSend = async (e) => {
        e.preventDefault();
        if (
            isEmpty(data.password) ||
            isEmpty(data.confirmPassword) ||
            data.password !== data.confirmPassword
        ) {
            return setLocalErrors({ ...localErrors, inputErrors: true })
        }

        try {

            await Axios.post(
                resetPasswordApiUrl + '?token=' + router.query.token, {
                    newPassword: data.password
                }
            )

            window.location.href = `/login`
        } catch (error) {
            // if (error.response && error.response.data.message === "accountIsNotConfirmedPleaseConfirmYourAccount") {
            //     setLocalErrors({ verifyYourAccount: true, wrongEmailOrPassword: false })
            // }
            // if (error.response && error.response.data.message === "wrongEmailOrPassword") {
            //     setLocalErrors({ wrongEmailOrPassword: true, verifyYourAccount: false })
            // }
        }
    }


    return (
        <div className={"html"}>
            <Head>
                <title>Mot de passe</title>

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Sporit connection" />
                <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
                <meta name="author" content="sporit" />
            </Head>
            <Layout>
                <div className={"login_container"}>
                    <form className={"left_side"}>
                        <div className={"logo"}>
                            <Link href={{ pathname: '/' }} >
                                <a>
                                    <img src="icon/logoindexpage.png" alt="" />
                                </a>
                            </Link>
                        </div>
                        <h1 className={"page_title"}>Mot de passe oublié</h1>
                        <input value={data.password} onChange={e => setData({ ...data, password: e.target.value })} className={"input"} placeholder='Mot de passe' type='password' />
                        {
                            localErrors.inputErrors && isEmpty(data.password) && <span className={"error"}>Champ obligatoire</span>
                        }

                        <input value={data.confirmPassword} onChange={e => setData({ ...data, confirmPassword: e.target.value })} className={"input"} placeholder='Confirmation mot de passe' type='password' />
                        {
                            localErrors.inputErrors && isEmpty(data.confirmPassword) && <span className={"error"}>Champ obligatoire</span>
                        }
                        {
                            localErrors.inputErrors && data.password !== data.confirmPassword && <span className={"error"}>Deux mots de passe ne sont pas égaux</span>
                        }
                        <center>
                            <b>
                                <Link href={{ pathname: '/login' }} >
                                    <a style={{ color: '#26beb5' }}>
                                        Se Connecter
                                    </a>
                                </Link>
                            </b>
                        </center>
                        <div className={"signup_btn_container"}>
                            <button onClick={onSend} className={"primary_button"}>Envoyer</button>
                        </div>
                    </form>


                    <div style={{ backgroundImage: 'url(loginBgColor.svg)' }} className={"right_side"}>
                        <h2 className={"title"}>
                            Rejoignez notre platforme
                        </h2>

                        <span className={"description"}>
                            Entrez vos information et débutez avec nous votre parcours
                        </span>
                        <Link href={{ pathname: '/login', query: router.query }} >
                            <a>
                                <button className={"button"} type="submit">
                                    S'INSCRIRE
                                </button>
                            </a>
                        </Link>

                    </div>
                </div>
            </Layout>

        </div>
    )
}


ForgotPassword.getInitialProps = async (ctx) => {

    return ({
        namespacesRequired: ['common'],
    })
}


export default ForgotPassword