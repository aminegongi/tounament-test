import Head from "next/head"
import css from '../shared/css/login.scss'
import { useState } from 'react'
import Link from "next/link"
import { isEmpty, isNumber } from 'lodash'
import { useRouter } from 'next/router'
import Axios from "axios"

const Login = (props) => {
    const router = useRouter()
    const [email, setEmail] = useState(router.query.email ? router.query.email : '')
    const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')
    const [password, setPassword] = useState('')
    const [localErrors, setLocalErrors] = useState({ wrongEmailOrPassword: false, verifyYourAccount: router.query.verifyEmail === 'true' || false })

    const onLogin = async () => {
        if (
            isEmpty(email) || isEmpty(password)
        ) {
            return setLocalErrors({ ...localErrors, inputErrors: true })
        }

        if (router.query.env === 'dev') {
            try {
                const result = await Axios.post(
                    "https://dev.api.isporit.com/auth/login",
                    {
                        email,
                        password,
                    },
                )
                localStorage.setItem('token', result.data.token)
                if (router.query.isLocalhost === 'true') {

                    window.location.href = 'http://localhost:3000?accessToken=' + result.data.token
                } else {
                    window.location.href = 'https://dev.isporit.com?accessToken=' + result.data.token
                }

            } catch (error) {
                if (error.response && error.response.data.message === "accountIsNotConfirmedPleaseConfirmYourAccount") {
                    setLocalErrors({ verifyYourAccount: true, wrongEmailOrPassword: false })
                }
                if (error.response && error.response.data.message === "wrongEmailOrPassword") {
                    setLocalErrors({ wrongEmailOrPassword: true, verifyYourAccount: false })
                }
            }
        } else if (router.query.env === 'test') {
            try {
                const result = await Axios.post(
                    "https://test.api.isporit.com/auth/login",
                    {
                        email,
                        password,
                    },
                )
                localStorage.setItem('token', result.data.token)
                if (router.query.isLocalhost === 'true') {

                    window.location.href = 'http://localhost:3000?accessToken=' + result.data.token
                } else {
                    window.location.href = 'https://test.isporit.com?accessToken=' + result.data.token
                }

            } catch (error) {
                if (error.response && error.response.data.message === "accountIsNotConfirmedPleaseConfirmYourAccount") {
                    setLocalErrors({ verifyYourAccount: true, wrongEmailOrPassword: false })
                }
                if (error.response && error.response.data.message === "wrongEmailOrPassword") {
                    setLocalErrors({ wrongEmailOrPassword: true, verifyYourAccount: false })
                }
            }
        } else {
            try {
                const result = await Axios.post(
                    "https://api.isporit.com/auth/login",
                    {
                        email,
                        password,
                    },
                )
                localStorage.setItem('token', result.data.token)
                if (router.query.isLocalhost === 'true') {

                    window.location.href = 'http://localhost:3000?accessToken=' + result.data.token
                } else {
                    window.location.href = 'https://app.isporit.com?accessToken=' + result.data.token
                }

            } catch (error) {
                if (error.response && error.response.data.message === "accountIsNotConfirmedPleaseConfirmYourAccount") {
                    setLocalErrors({ verifyYourAccount: true, wrongEmailOrPassword: false })
                }
                if (error.response && error.response.data.message === "wrongEmailOrPassword") {
                    setLocalErrors({ wrongEmailOrPassword: true, verifyYourAccount: false })
                }
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
            <div className={css.login_container}>
                <div className={css.left_side}>
                    <div className={css.logo}>
                        <Link href={{ pathname: '/' }} >
                            <a>
                                <img src="icon/logoindexpage.png" alt="" />
                            </a>
                        </Link>
                    </div>
                    <h1 className={css.page_title}>Connectez-vous</h1>

                    <input value={email} onChange={e => setEmail(e.target.value)} className={css.input} placeholder='Email' />
                    {
                        localErrors.inputErrors && isEmpty(email) && <span className={css.error}>Champ obligatoire</span>
                    }
                    <input value={password} onChange={e => setPassword(e.target.value)} className={css.input} placeholder='Mot de passe' type="password" />
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
                </div>

                <div style={{ backgroundImage: 'url(loginBgColor.svg)' }} className={css.right_side}>
                    <h2 className={css.title}>
                        Rejoignez notre platforme
                   </h2>

                    <span className={css.description}>
                        Entrez vos information et débutez avec nous votre parcours
                   </span>
                    <Link href={{ pathname: '/sign-up', query: { isLocalhost: router.query.isLocalhost || '', env: router.query.env || '' } }} >
                        <a>
                            <button className={css.button} type="submit">
                                S'INSCRIRE
                            </button>
                        </a>
                    </Link>

                </div>
            </div>

        </div>
    )
}


Login.getInitialProps = async (ctx) => {

    return ({
        namespacesRequired: ['common'],
    })
}


export default Login