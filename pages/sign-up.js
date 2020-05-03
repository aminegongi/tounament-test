import Head from "next/head"
import css from '../shared/css/login.scss'
import { useState, useEffect, Fragment } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
import { i18n, withTranslation } from '../i18n'
import PropTypes from 'prop-types'
import Navbar from "../shared/components/navbar/Navbar"


const fakeData = [
    {
        title: 'Terrain de tennis',
        description: 'Lorem ipsum dolor aset amit elit, sed do eiusmo  incididunt ut labore et dolore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
        location: 'Gammarth life Club, La marsa.',
        image: '/tennisLoginImage.svg'
    },
    {
        title: 'Terrain de foot',
        description: 'Lorem ipsum dolor aset amit elit, sed do eiusmo  incididunt ut labore et dolore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
        location: 'Gammarth life Club, La marsa.',
        image: 'https://gopark.fr/wp-content/uploads/2014/02/foot1-600x300.jpg'
    },
    {
        title: 'Terrain de padel',
        description: 'Lorem ipsum dolor aset amit elit, sed do eiusmo  incididunt ut labore et dolore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
        location: 'Gammarth life Club, La marsa.',
        image: 'https://padelmagazine.fr/wp-content/uploads/2017/06/prix-terrain-de-padel-780x405.jpg'
    }
]

const SignUpModal = ({ load, email, lang }) => {
    const [loading, setLoading] = useState(load)
    const router = useRouter()
    useEffect(() => {
        setLoading(load)
    }, [load])

    useEffect(() => {
        window.location.href = "/";
    }, [])


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
    const [cardNumber, setCardNumber] = useState(0)
    const [email, setEmail] = useState(router.query.email ? router.query.email : '')
    const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')
    const [username, setUsername] = useState(router.query.username ? router.query.username : '')
    const [password, setPassword] = useState('')
    const [modal, setModal] = useState((router.query.type === '' || router.query.type === undefined || router.query.type !== 'player' || router.query.type !== 'coach' || router.query.type !== 'club') ? true : false)
    const [isNabVisible, setNavIsVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            if (cardNumber === fakeData.length - 1) {
                setCardNumber(0)
            } else setCardNumber(cardNumber + 1)
        }, 1000);
    }, [cardNumber])

    useEffect(() => {
        if (!(router.query.type === '' || router.query.type === undefined)) {
            setModal(false)
        }
    }, [router.query.type])

    useEffect(() => {
        setLang(i18n.language)

    }, [i18n.language])

    return (
        <div className={css.html}>
            <Head>
                <title>SignUp</title>
                <link rel="icon" href="/logo.png" />

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Sporit Home page " />
                <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
                <meta name="author" content="sporit" />
            </Head>
            {
                lang && <Fragment>

                    <div className={css.login_container}>

                        <SignUpModal load={modal} email={email} lang={lang} />
                        <div className={css.left_side}>
                            <div className={css.logo}>
                                <Link href='/'><a><img src='/logoSporitLight.svg' alt='sporit' /></a></Link>
                            </div>
                            <div className={css.slider_title}>
                                Réservez votre terrain <br />
                                en toute facilité en ligne
                            </div>
                            <div className={css.slider_card_container}>
                                {
                                    fakeData.map((el, index) => {
                                        if (index === cardNumber) return <div key={index * 100} className={css.slider_card}>
                                            <div className={css.booking_images} style={{ backgroundImage: `url(${el.image})` }} />
                                            <div className={css.card_body}>
                                                <h4>{el.title}</h4>
                                                <p>{el.description}</p>
                                                <div><img src='/locationPin.svg' /> <span>{el.location}</span></div>
                                            </div>
                                            <div className={css.card_footer}>
                                                <button className={css.light_button}>Découvrir</button>
                                                <button className={css.primary_button}>Réserver</button>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={css.slider_dots}>{
                                fakeData.map((el, index) => <div key={index} className={`${index === cardNumber ? css.active_dot : css.dot}`} />)
                            }</div>


                        </div>
                        <div className={css.right_side}>
                            <div className={css.mobile_navbar}>
                                <Navbar isNabVisible={isNabVisible} setNavIsVisible={setNavIsVisible} />
                            </div>
                            <div className={css.top_section_container}>
                                <div className={css.top_section}>
                                    <span className={css.text}>
                                        <a>déjà un compte ?</a>
                                    </span>
                                    <Link href={{ pathname: '/login', query: { email, lang } }} className={css.top_section}>
                                        <a><button className={css.se_connecter}>
                                            SE CONNECTER
                                        </button></a>

                                    </Link>
                                </div>
                            </div>
                            <h1 className={css.page_title}>Inscrivez-vous gratuitement</h1>

                            {
                                router.query.type !== "club" && <Fragment>
                                    <div className={css.social_media_buttons}>
                                        <a href={`https://www.facebook.com/v5.0/dialog/oauth?scope=email,public_profile&client_id=741324166334810&redirect_uri=https%3A%2F%2Fapi.isporit.com%2Fauth%2Ffacebook%2Fcallback&state={"signup":true,"role":"${router.query.type}"} `} className={css.social_media1}>
                                            <img src='/facebook.svg' alt='facebook' />
                                        </a>
                                    </div>
                                    <p>ou bien utilisez vos informations personnelles</p>
                                </Fragment>
                            }
                            <input value={username} onChange={e => setUsername(e.target.value)} className={css.input} placeholder='Nom et Prénom' type='text' />
                            <input value={email} onChange={e => setEmail(e.target.value)} className={css.input} placeholder='Email' type='email' />
                            <input value={password} onChange={e => setPassword(e.target.value)} className={css.input} placeholder='Password' type='password' />
                            <div className={css.signup_btn_container}>
                                <button className={css.primary_button}>Inscription</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }

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