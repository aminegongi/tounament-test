import getConfig from "next/config";
import Head from "next/head"
import css from '../shared/css/login.scss'
import { useState } from 'react'
import Link from "next/link"
import { isEmpty, isNumber } from 'lodash'
import { useRouter } from 'next/router'
import Axios from "axios"
import Layout from "../shared/components/layout/Layout";
import routes from "../utils/routes";
import { Input } from "antd";

const { publicRuntimeConfig } = getConfig();

const Login = (props) => {
    const router = useRouter()
    const [email, setEmail] = useState(router.query.email ? router.query.email : '')
    const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')
    const [password, setPassword] = useState('')
    const [localErrors, setLocalErrors] = useState({ wrongEmailOrPassword: false, verifyYourAccount: router.query.verifyEmail === 'true' || false })

    const {
        redirectTo = publicRuntimeConfig.LOGIN_REDIRECT_URL,
        env = "prod"
    } = router.query;
    const apiUrl = publicRuntimeConfig[`${env.toUpperCase()}_API_URL`];
    const loginApiUrl = apiUrl + "/auth/login";

    if (!apiUrl) {
        console.error("Missing API URL for this environment");
    }

    const onLogin = async (e) => {
        e.preventDefault();
        if (
            isEmpty(email) || isEmpty(password)
        ) {
            return setLocalErrors({ ...localErrors, inputErrors: true })
        }

        try {
            const result = await Axios.post(
                loginApiUrl,
                {
                    email,
                    password,
                },
            )
            localStorage.setItem('token', result.data.token)
            window.location.href = `${redirectTo}?accessToken=${result.data.token}`
        } catch (error) {
            if (error.response && error.response.data.message === "accountIsNotConfirmedPleaseConfirmYourAccount") {
                setLocalErrors({ verifyYourAccount: true, wrongEmailOrPassword: false })
            }
            if (error.response && error.response.data.message === "wrongEmailOrPassword") {
                setLocalErrors({ wrongEmailOrPassword: true, verifyYourAccount: false })
            }
        }
    }


    return (
        <div className={css.html}>
            <Head>
                <title>Login</title>

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Sporit connection" />
                <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
                <meta name="author" content="sporit" />
            </Head>
            <Layout>
                <div className={css.login_container}>
                    <form className={css.left_side}>
                        <h1 className={css.page_title}>Connectez-vous</h1>
                        <Input value={email} onChange={e => setEmail(e.target.value)} className={css.input} placeholder='Email' type="email" />
                        {
                            localErrors.inputErrors && isEmpty(email) && <span className={css.error}>Champ obligatoire</span>
                        }
                        <Input value={password} onChange={e => setPassword(e.target.value)} className={css.input} placeholder='Mot de passe' type="password" />
                        <center className={css.forgot_password}>
                            <Link href={{ pathname: '/forgot-password' }} >
                                <a style={{ color: '#26beb5' }}>
                                    Mot de passe oublié?
                                    </a>
                            </Link>
                        </center>
                        {
                            localErrors.inputErrors && isEmpty(password) && <span className={css.error}>Champ obligatoire</span>
                        }
                        <div className={css.error}>
                            {
                                localErrors.verifyYourAccount && "Compte n'est pas vérifié, Veuillez confirmer votre inscription par email"
                            }
                            {
                                localErrors.wrongEmailOrPassword && "E-mail ou mot de passe incorrect"
                            }
                        </div>
                        <div className={css.signup_btn_container}>
                            <button onClick={onLogin} className={css.primary_button}>Se Connecter</button>
                        </div>
                        <div className={css.create_account_btn}>
                            <Link href={routes.SIGN_UP.path} >
                                <a>
                                    <button className={css.button} type="submit">
                                        Créer un compte
                                    </button>
                                </a>
                            </Link>
                        </div>
                    </form>

                    <div style={{ backgroundImage: 'url(loginBgColor.svg)' }} className={css.right_side}>
                        <h2 className={css.title}>
                            Rejoignez notre platforme
                        </h2>

                        <span className={css.description}>
                            Entrez vos information et débutez avec nous votre parcours
                        </span>
                        <Link href={{ pathname: '/sign-up' }} >
                        {/* query: router.query */}
                            <a>
                                <button className={css.button} type="submit">
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


Login.getInitialProps = async (ctx) => {

    return ({
        namespacesRequired: ['common'],
    })
}


export default Login