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

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
}

function startWithNumber(string) {
    const re = /^[a-zA-Z].*/
    return re.test(string)
}


const SignUpModal = ({ load, email, lang }) => {
    const [loading, setLoading] = useState(load)
    const router = useRouter()
    useEffect(() => {
        setLoading(load)
    }, [load])



    if (loading) {
        return <div className={css.modal_container}>
            <div className={css.modal}>
                <Link href={{ pathname: '/sign-up', query: { email, lang, type: 'club' } }}>
                    <a><div className={css.modal_item}>
                        <img src='/espaceClub.svg' alt='espace club' />
                        <h2>
                            Espace<br />Club
                        </h2>
                        <button className={css.primary_button}>Inscription</button>

                    </div></a>
                </Link>
                <Link href={{ pathname: '/sign-up', query: { email, lang, type: 'coach' } }}>
                    <a> <div onClick={() => setLoading(false)} className={css.modal_item}>
                        <img src='/espaceCoach.svg' alt='espace coach' />
                        <h2>
                            Espace<br />Entraîneur
                    </h2>
                        <button className={css.primary_button}>Inscription</button>
                    </div></a>
                </Link>
                <Link href={{ pathname: '/sign-up', query: { email, lang, type: 'player' } }}>
                    <a><div onClick={() => setLoading(false)} className={css.modal_item}>
                        <img src='/espacePlayer.svg' alt='espace player' />
                        <h2>
                            Espace<br />Joueur
                        </h2>
                        <button className={css.primary_button}>Inscription</button>
                    </div></a>
                </Link>
            </div>
        </div>
    }
    return <Fragment />
}

const SignUp = () => {
    const router = useRouter()
    const [data, setData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: router.query.email || "",
        birthday: "",
        password: "",
        confirmPassword: "",
        local: "fr",
        address: "",
        userType: "player",
        sport: [],
        country: "Tunisia",
        phoneNumber: "",
        facebookLink: ""
    })
    const [cardNumber, setCardNumber] = useState(0)
    const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')
    const [username, setUsername] = useState(router.query.username ? router.query.username : '')
    const [modal, setModal] = useState((router.query.type === '' || router.query.type === undefined || router.query.type !== 'player' || router.query.type !== 'coach' || router.query.type !== 'club') ? true : false)
    const [isNabVisible, setNavIsVisible] = useState(false)

    const [localErrors, setLocalErrors] = useState({ userAlreadyExist: false, inputErrors: false })

    useEffect(() => {
        if (!(router.query.type === '' || router.query.type === undefined)) {
            setModal(false)
        }
    }, [router.query.type])

    useEffect(() => {
        setLang(i18n.language)

    }, [i18n.language])


    const onRegister = async () => {
        if (
            data.username.length < 6 ||
            isNumber(data.username.slice(0, 1)) ||
            isEmpty(data.firstName) ||
            isEmpty(data.lastName) ||
            isEmpty(data.email) ||
            !validateEmail(data.email) ||
            isEmpty(data.birthday) ||
            isEmpty(data.password) ||
            isEmpty(data.confirmPassword) ||
            data.password !== data.confirmPassword
        ) {
            return setLocalErrors({ ...localErrors, inputErrors: true })
        }

        if (router.query.env && router.query.env.includes('dev')) {
            try {
                if (router.query.invitationToken) {
                    await Axios.post(
                        "https://dev.api.isporit.com/auth/register?invitationToken=" + router.query.invitationToken,
                        {
                            ...data
                        },
                    )
                } else {
                    await Axios.post(
                        "https://dev.api.isporit.com/auth/register",
                        {
                            ...data
                        },
                    )
                }


                if (!isEmpty(router.query.invitationToken)) {
                    return Modal.success({
                        content: 'Félicitations et bienvenue à iSporit',
                        onOk() { onLogin() }
                    });
                }
                return Modal.success({
                    content: 'Bienvenue à iSporit, Veuillez confirmer votre inscription par email',
                    onOk() { router.push('/login?email=' + data.email + '&verifyEmail=true&env=' + router.query.env) }
                });

            } catch (error) {
                if (error.response && error.response.data.errors && error.response.data.errors.email && error.response.data.errors.email.message === "userAlreadyExists") {
                    setLocalErrors({ ...localErrors, userAlreadyExist: true })
                }
            }
        }
    }


    const onLogin = async () => {
        if (router.query.env && router.query.env.includes('dev')) {
            try {
                const result = await Axios.post(
                    "https://dev.api.isporit.com/auth/login",
                    {
                        email: data.email,
                        password: data.password,
                    },
                )
                if (router.query.isLocalhost) {

                    window.location.href = 'http://localhost:3000?accessToken=' + result.data.token
                } else {
                    window.location.href = 'https://dev.isporit.com?accessToken=' + result.data.token
                }

            } catch (error) {
                router.push('/login?email=' + data.email + '&verifyEmail=true&env=' + router.query.env) 
            }
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

                    <input value={data.username} onChange={e => setData({ ...data, username: e.target.value })} className={css.input} placeholder='username' type='text' />
                    {
                        localErrors.inputErrors && data.username.length < 6 && <span className={css.error}>Minimum 6 caractère</span>
                    }
                    {
                        localErrors.inputErrors && !startWithNumber(data.username) && <span className={css.error}>Username doit commencer par un caractère</span>
                    }


                    <input value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} className={css.input} placeholder='firstName' type='text' />
                    {
                        localErrors.inputErrors && isEmpty(data.firstName) && <span className={css.error}>Champ obligatoire</span>
                    }


                    <input value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} className={css.input} placeholder='lastName' type='text' />
                    {
                        localErrors.inputErrors && isEmpty(data.lastName) && <span className={css.error}>Champ obligatoire</span>
                    }


                    <input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className={css.input} placeholder='Email' type='email' />
                    {
                        localErrors.inputErrors && isEmpty(data.email) && <span className={css.error}>Champ obligatoire</span>
                    }

                    {
                        localErrors.inputErrors && !validateEmail(data.email) && <span className={css.error}>Cette adresse email n'est pas valide</span>
                    }




                    <input value={data.birthday} onChange={e => setData({ ...data, birthday: e.target.value })} className={css.input} placeholder='birthday' type='date' />
                    {
                        localErrors.inputErrors && isEmpty(data.birthday) && <span className={css.error}>Champ obligatoire</span>
                    }
                    {
                        localErrors.inputErrors && moment().isBefore(data.birthday) && <span className={css.error}>Date n'est pas valid</span>
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

                    <select value={data.userType} onChange={e => setData({ ...data, userType: e.target.value })} className={css.input} name="" id="">
                        <option value="player">Joueur</option>
                        <option value="coach">Entraineur</option>
                    </select>



                    {
                        localErrors.userAlreadyExist && <span className={css.error}>Email ou Username existe déjà</span>
                    }
                    <div className={css.signup_btn_container}>
                        <button onClick={onRegister} className={css.primary_button}>S'INSCRIRE</button>
                    </div>
                </div>

                <div style={{ backgroundImage: 'url(loginBgColor.svg)' }} className={css.right_side}>
                    <h2 className={css.title}>
                        Vous avez déjà un compte
                   </h2>

                    <Link href={{ pathname: '/login', query: { email: data.email, isLocalhost: router.query.isLocalhost, env: router.query.env } }} >
                        <a>
                            <button className={css.button} type="submit">
                                SE CONNECTER
                            </button>
                        </a>
                    </Link>

                </div>
            </div>


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