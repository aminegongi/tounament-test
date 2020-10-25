import getConfig from "next/config"
import Head from "next/head"
import css from '../shared/css/login.scss'
import { useState, useEffect, Fragment } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
import { i18n, withTranslation } from '../i18n'
import PropTypes from 'prop-types'
import { isEmpty, isNumber } from 'lodash'
import moment from 'moment'
import Navbar from "../shared/components/navbar/Navbar"
import Axios from "axios"
import { Modal } from 'antd';
import randomId from 'random-id'
import Layout from "../shared/components/layout/Layout"

const { publicRuntimeConfig } = getConfig();

const MAX_USERNAME_LENGTH = 60


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
}

function validateUsername(string) {
    const re = /^[a-z][a-z\-0-9]+[a-z0-9]$/i
    return re.test(string)
}


function validatePhoneNumber(string) {
    const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
    return re.test(string)
}

function removeSpaceInString(string){
    return string.replace(/\s/g, '')
}



const SignUp = () => {
    const router = useRouter()
    const [data, setData] = useState({
        username: (router.query.firstName && router.query.lastName) ? removeSpaceInString(`${router.query.firstName}${router.query.lastName}`)+randomId(MAX_USERNAME_LENGTH-`${router.query.firstName}${router.query.lastName}`.length, 'aA0') : "",
        firstName: router.query.firstName || "",
        lastName: router.query.lastName || "",
        email: router.query.email || "",
        birthday: "",
        password: "",
        confirmPassword: "",
        address: "",
        userType: "player",
        sport: [],
        country: "Tunisia",
        timezone: "Africa/Tunis",
        phoneNumber: router.query.phoneNumber || "",
        facebookLink: "",
        timezone: "Africa/Tunis",
        locale: 'fr'
    })
    const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')

    const [localErrors, setLocalErrors] = useState({ usernameAlreadyExists: false, inputErrors: false, emailAlreadyExists: false })

    useEffect(() => {
        if (!(router.query.type === '' || router.query.type === undefined)) {
            setModal(false)
        }
    }, [router.query.type])

    useEffect(() => {
        setLang(i18n.language)

    }, [i18n.language])

    const {
        redirectTo = publicRuntimeConfig.LOGIN_REDIRECT_URL,
        env = "prod"
    } = router.query;
    const apiUrl = publicRuntimeConfig[`${env.toUpperCase()}_API_URL`];
    const registerApiUrl = apiUrl + "/auth/register"
    const loginApiUrl = apiUrl + "/auth/login";

    const onRegister = async (e) => {
        e.preventDefault();
        if (
            data.username.length < 6 ||
            isNumber(data.username.slice(0, 1)) ||
            data.username.includes(" ") ||
            isEmpty(data.firstName) ||
            isEmpty(data.lastName) ||
            isEmpty(data.email) ||
            !validateEmail(data.email) ||
            isEmpty(data.birthday) ||
            isEmpty(data.password) ||
            isEmpty(data.confirmPassword) ||
            !validatePhoneNumber(data.phoneNumber) ||
            !validateUsername(data.username) ||
            data.phoneNumber.length < 7 ||
            data.password !== data.confirmPassword
        ) {
            return setLocalErrors({ ...localErrors, inputErrors: true })
        }

        try {
            let result = {}
            let query = "";
            if (router.query.invitationToken) {
                query = `invitationToken=${router.query.invitationToken}`
            }
            result = await Axios.post(
                `${registerApiUrl}?${query}`,
                {
                    ...data
                },
            )

            if (result.data.message === "invalidInvitation") {
                return Modal.success({
                    content: 'Bienvenue à iSporit, Veuillez confirmer votre inscription par email',
                    onOk() {
                        router.push({
                            pathname: "/login", query: {
                                ...router.query,
                                email: data.email,
                                verifyEmail: true
                            }
                        })
                    }
                })
            }
            return Modal.success({
                content: 'Félicitations et bienvenue à iSporit',
                onOk() { onLogin() }
            })

        } catch (error) {
            if (error.response && error.response.data.errors && error.response.data.errors.email && error.response.data.errors.email.message === "emailAlreadyExists") {
                setLocalErrors({ ...localErrors, emailAlreadyExists: true, usernameAlreadyExists: false })
            }
            if (error.response && error.response.data.errors && error.response.data.errors.username && error.response.data.errors.username.message === "usernameAlreadyExists") {
                setLocalErrors({ ...localErrors, usernameAlreadyExists: true, emailAlreadyExists: false })
            }
        }
    }


    const onLogin = async () => {
        try {
            const result = await Axios.post(
                loginApiUrl,
                {
                    email: data.email,
                    password: data.password,
                },
            )
            localStorage.setItem('token', result.data.token)
            window.location.href = `${redirectTo}?accessToken=${result.data.token}`
        } catch (error) {
            router.push({
                pathname: "/login", query: {
                    ...router.query,
                    email: data.email,
                    verifyEmail: true
                }
            })
        }
    }

    return (
        <div className={css.html}>
            <Head>
                <title>Register</title>
                <link rel="icon" href="/logo.png" />

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Sporit Home page " />
                <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
                <meta name="author" content="sporit" />
            </Head>
            <Layout>
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

                        <input maxLength={MAX_USERNAME_LENGTH} value={data.username} onChange={e => setData({ ...data, username: removeSpaceInString(e.target.value) })} className={css.input} placeholder="Nom d'utilisateur" type='text' />
                        {
                            localErrors.inputErrors && data.username.length < 6 && <span className={css.error}>Minimum 6 caractère</span>
                        }
                        {
                            localErrors.inputErrors && !validateUsername(data.username) && <span className={css.error}>Nom d'utilisateur n'est pas valide ( seuls les chiffres et lettres de l'alphabet sont autorisés )</span>
                        }
                        {
                            localErrors.inputErrors && !isNaN(data.username.charAt(0)) && <span className={css.error}>Le nom d'utilisateur doit commencer par une lettre alphabétique</span>
                        }


                        {
                            localErrors.usernameAlreadyExists && <span className={css.error}>Nom d'utilisateur existe déjà</span>
                        }


                        <input value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} className={css.input} placeholder='Prénom' type='text' />
                        {
                            localErrors.inputErrors && isEmpty(data.firstName) && <span className={css.error}>Champ obligatoire</span>
                        }


                        <input value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} className={css.input} placeholder='Nom de famille' type='text' />
                        {
                            localErrors.inputErrors && isEmpty(data.lastName) && <span className={css.error}>Champ obligatoire</span>
                        }


                        <input maxLength={40} value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className={css.input} placeholder='Email' type='email' disabled={!isEmpty(router.query.email)} />
                        {
                            localErrors.inputErrors && isEmpty(data.email) && <span className={css.error}>Champ obligatoire</span>
                        }

                        {
                            localErrors.inputErrors && !validateEmail(data.email) && <span className={css.error}>Cette adresse email n'est pas valide</span>
                        }

                        {
                            localErrors.emailAlreadyExists && <span className={css.error}>Email existe déjà</span>
                        }




                        <input value={data.birthday} onChange={e => setData({ ...data, birthday: e.target.value })} className={css.input} placeholder='Date de naissance' type='date' />
                        {
                            localErrors.inputErrors && isEmpty(data.birthday) && <span className={css.error}>Champ obligatoire</span>
                        }
                        {
                            localErrors.inputErrors && moment().isBefore(data.birthday) && <span className={css.error}>Date n'est pas valid</span>
                        }

                        <input maxLength={40} value={data.phoneNumber} onChange={e => setData({ ...data, phoneNumber: e.target.value })} className={css.input} placeholder='Numéro de téléphone' />
                        {
                            localErrors.inputErrors && isEmpty(data.phoneNumber) && <span className={css.error}>Champ obligatoire</span>
                        }


                        {
                            localErrors.inputErrors && !validatePhoneNumber(data.phoneNumber) && <span className={css.error}>Numéro de téléphone n'est pas valide</span>
                        }
                        {
                            localErrors.inputErrors && data.phoneNumber.length < 7 && <span className={css.error}>Au moins 8 numéros</span>
                        }

                        {
                            !router.query.invitationToken && <select value={data.userType} onChange={e => setData({ ...data, userType: e.target.value })} className={css.input} name="" id="">
                                <option value="player">Joueur</option>
                                <option value="coach">Entraineur</option>
                            </select>
                        }


                        <input value={data.password} onChange={e => setData({ ...data, password: e.target.value })} className={css.input} placeholder='Mot de passe' type='password' />
                        {
                            localErrors.inputErrors && isEmpty(data.password) && <span className={css.error}>Champ obligatoire</span>
                        }

                        <input value={data.confirmPassword} onChange={e => setData({ ...data, confirmPassword: e.target.value })} className={css.input} placeholder='Confirmation mot de passe' type='password' />
                        {
                            localErrors.inputErrors && isEmpty(data.confirmPassword) && <span className={css.error}>Champ obligatoire</span>
                        }
                        {
                            localErrors.inputErrors && data.password !== data.confirmPassword && <span className={css.error}>Deux mots de passe ne sont pas égaux</span>
                        }

                        <div className={css.signup_btn_container}>
                            <button onClick={onRegister} className={css.primary_button}>S'INSCRIRE</button>
                        </div>
                    </div>

                    <div style={{ backgroundImage: 'url(loginBgColor.svg)' }} className={css.right_side}>
                        <h2 className={css.title}>
                            Vous avez déjà un compte
                   </h2>

                        <Link href={{ pathname: '/login', query: { email: data.email, isLocalhost: router.query.isLocalhost || '', env: router.query.env || '' } }} >
                            <a>
                                <button className={css.button} type="submit">
                                    SE CONNECTER
                            </button>
                            </a>
                        </Link>

                    </div>
                </div>
            </Layout>


        </div>
    )
}

SignUp.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

SignUp.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('common')(SignUp);