import { Fragment } from 'react'
import Link from 'next/link';
import Head from 'next/head'
import Layout from '../shared/components/layout/Layout';
import css from '../shared/css/contact-us.scss';
import { useRouter } from 'next/router'
import { i18n, withTranslation } from '../i18n'
import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import { isEmpty } from 'lodash'

import '../shared/global-style.scss'

import Axios from 'axios';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const ContactUs = (props) => {
    const router = useRouter()
    const [lang, setLang] = useState(undefined)
    const [model , setModel] = useState({})
    const [errors , setErrors] = useState({})
    useEffect(() => {
      setLang(i18n.language)
    }, [i18n.language])
    
   

    const onSubmit = () => {
        const newErrors = {}
        if (!model.firstName || model.firstName === "") newErrors.firstName= true
        if (!model.lastName || model.lastName === "") newErrors.lastName= true
        if (!model.email || model.email === "" || !validateEmail(model.email) ) newErrors.email= true
        if (!model.phoneNumber || (model.phoneNumber === "" || model.phoneNumber.length < 8) ) newErrors.phoneNumber= true
        if (!model.subject || model.subject === "") newErrors.subject= true 
        if (!model.body || model.body === "") newErrors.body= true
        setErrors(newErrors)
        if (isEmpty(newErrors)) {
            Axios.post('https://api.isporit.com/contact/', {...model}).then(res => {
                alert(props.t("contactUsOnSubmitSuccess", "Thank you an"))
                
                setModel({email : "" , firstName :"" , lastName:"" , phoneNumber:"" , subject:"" ,body:""})
            }).catch(e => {
                if (e.response.data.message === "Invalid phone number") {
                    setErrors({...errors , phoneNumber: true})
                }
            })
        }
    }

    return (
        <Fragment>
            <Head>
                <title>{props.t("contactUsHeadTitle", "Contact Us")}</title>
                <link rel="icon" href="/logo.png" />

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Sporit contact us page " />
                <meta name="keywords" content="sporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644" />
                <meta name="author" content="sporit" />

            </Head>

            {
                lang && <Layout>
                <div className={css.contact_us_container}>
                    <div className={css.left_side}>
                        <div className={css.top_description}>
                            <h1 className={css.h1}>
                                {props.t("contactUsTitle", "Contact Us")}
                            </h1>
                            <p className={css.p}>
                                {props.t("contactUsSubTitle", "Send us your information and we will contact you as soon as possible.")}
                            </p>
                        </div>

                        <div className={css.form_container}>
                            <div className={css.form_item}>
                                <label htmlFor="prenom">{props.t('contactUsFirstName', "First Name")}</label>
                                <input className={`${errors.firstName ? css.input_error : ""}`} value={model.firstName} type="text" id="prenom" onChange={e => {
                                    setModel({...model , firstName : e.target.value});
                                    setErrors({...errors, firstName: false})
                                } } placeholder={'John'} />
                            </div>
                            <div className={css.form_item}>
                                <label htmlFor="Nom">{props.t('contactUsLastName', "Last Name")}</label>
                                <input className={`${errors.lastName ? css.input_error : ""}`} value={model.lastName} type="text" id="Nom" onChange={e => {
                                    setModel({...model , lastName : e.target.value});
                                    setErrors({...errors, lastName: false})
                                }} placeholder={'doe'} />
                            </div>
                            <div className={css.form_item}>
                                <label htmlFor="E-mail">{props.t('contactUsEmail', 'Email')}</label>
                                <input className={`${errors.email ? css.input_error : ""}`} value={model.email} type="email" id="E-mail" onChange={e => {
                                    setModel({...model , email : e.target.value});
                                    setErrors({...errors, email: false})
                                }} placeholder={'contact@isporit.com'} />
                            </div>
                            <div className={css.form_item}>
                                <label htmlFor="Numero de telephone">{props.t('contactUsPhoneNumber', 'Phone Number')}</label>
                                <input className={`${errors.phoneNumber ? css.input_error : ""}`} value={model.phoneNumber} type="number" id="Numero de telephone" onChange={e => {
                                    setModel({...model , phoneNumber : e.target.value});
                                    setErrors({...errors, phoneNumber: false})
                                }} placeholder={'+216 54162644'} />
                            </div>
                            <div className={css.complete_form_item}>
                                <label htmlFor="Quel est l'objectif de votre demande ?">{props.t('contactUsObjective', "What is the purpose of your request?")}</label>
                                <input className={`${errors.subject ? css.input_error : ""}`} value={model.subject} type="text" id="Quel est l'objectif de votre demande ?" onChange={e => {
                                    setModel({...model , subject : e.target.value});
                                    setErrors({...errors, subject: false})
                                }} placeholder={props.t('contactUsTitlePlaceholder', "Title")} />
                            </div>
                            <div className={css.complete_form_item2}>
                                <label htmlFor="Message">{props.t('contactUsMessage', "Message")}</label>
                                <textarea className={`${errors.body ? css.input_error : ""}`} value={model.body} type="text" id="Message" rows="8" onChange={e => {
                                    setModel({...model , body : e.target.value});
                                    setErrors({...errors, body: false})
                                }} placeholder={'Message'} />
                            </div>
                            <button className={css.submit}  onClick={onSubmit} >{props.t('contactUsSendMessage', "Send my information")}</button>
                        </div>
                    </div>
                    <div className={css.right_side}>
                        <div className={css.empty_block} />
                        <p className={css.contact_description}>
                            {props.t('contactUsDescription' , "Our team is available 24/7 to answer you and guide you.")}
                        </p>
                        <div className={css.contact_buttons_container}>
                            <button className={css.email}>contact@isporit.com</button>
                            <button className={css.phone}>(+216) 54 162 644</button>
                        </div>
                    </div>
                </div>
            </Layout>
            }
        </Fragment>
    )
}


ContactUs.getInitialProps = async () => {
    return ({
        namespacesRequired: ['common']
    })
}

ContactUs.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('common')(ContactUs);