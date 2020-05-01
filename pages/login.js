import Head from "next/head"
import css from '../shared/css/login.scss'
import Layout from "../shared/components/layout/Layout"
import { useState, useEffect } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router'
import Navbar from "../shared/components/navbar/Navbar"
import Axios from "axios"
import cookies from 'next-cookies'

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
const Login = (props) => {
    const router = useRouter()
    const [cardNumber, setCardNumber] = useState(0)
    const [email, setEmail] = useState(router.query.email ? router.query.email : '')
    const [lang, setLang] = useState(router.query.lang ? router.query.lang : '')
    const [username, setUsername] = useState(router.query.username ? router.query.username : '')
    const [password, setPassword] = useState('')
    const [isNabVisible, setNavIsVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            if (cardNumber === fakeData.length - 1) {
                setCardNumber(0)
            } else setCardNumber(cardNumber + 1)
        }, 1000);
    }, [cardNumber])

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
            <div className={css.mobile_navbar}>
                <Navbar isNabVisible={isNabVisible} setNavIsVisible={setNavIsVisible} />
            </div>
            <div className={css.login_container}>
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
                                        <div><img alt="location" src='/locationPin.svg' /> <span>{el.location}</span></div>
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
                    <div className={css.top_section_container}>
                        <div className={css.top_section}>
                            <span className={css.text}>
                                <a>PAD DE COMPTE ?</a>
                            </span>
                            <Link href={{ pathname: '/sign-up', query: { email, lang } }} className={css.top_section}>
                                <a><button className={css.se_connecter}>
                                    S'INSCRIRE
                                </button></a>

                            </Link>
                        </div>
                    </div>
                    <h1 className={css.page_title}>Inscrivez-vous gratuitement</h1>
                    <div className={css.social_media_buttons}>
                        <a href='https://www.facebook.com/v5.0/dialog/oauth?scope=email,public_profile&client_id=741324166334810&redirect_uri=https%3A%2F%2Fapi.isporit.com%2Fauth%2Ffacebook%2Fcallback&state={"signup":false}' className={css.social_media1}>
                            <img src='/facebook.svg' alt='facebook' />
                        </a>
                        <div className={css.social_media2}>
                            <img src='/googleLogo.svg' alt='facebook' />
                        </div>
                    </div>
                    <p>ou bien</p>
                    <input value={email} onChange={e => setEmail(e.target.value)} className={css.input} placeholder='Email' type='email' />
                    <input value={password} onChange={e => setPassword(e.target.value)} className={css.input} placeholder='Password' type='password' />
                    <div className={css.signup_btn_container}>
                        <button className={css.primary_button}>Inscription</button>
                    </div>
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