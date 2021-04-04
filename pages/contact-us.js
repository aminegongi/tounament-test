/* eslint-disable react/jsx-filename-extension */
import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import '../shared/css/contact-us.scss'
import { useRouter } from 'next/router'
import { i18n, withTranslation } from '../i18n'
import PropTypes from 'prop-types'

import { isEmpty } from 'lodash'

import '../shared/global-style.scss'

import Axios from 'axios'
import Layout from '../shared/components/layout/Layout'

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const roles = ['player', 'coach', 'club']

function roleValidaton(role) {
  if (roles.includes(role)) return role
  return false
}

const ContactUs = (props) => {
  const router = useRouter()
  const [lang, setLang] = useState(undefined)
  const [model, setModel] = useState({
    role: roleValidaton(router.query.role) || 'player',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    subject: '',
    body: '',
  })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    setLang(i18n.language)
  }, [i18n.language])

  const onSubmit = () => {
    const newErrors = {}
    if (!model.firstName || model.firstName === '') newErrors.firstName = true
    if (!model.lastName || model.lastName === '') newErrors.lastName = true
    if (!model.email || model.email === '' || !validateEmail(model.email))
      newErrors.email = true
    if (
      !model.phoneNumber ||
      model.phoneNumber === '' ||
      model.phoneNumber.length < 8
    )
      newErrors.phoneNumber = true
    if (!model.subject || model.subject === '') newErrors.subject = true
    if (!model.body || model.body === '') newErrors.body = true
    setErrors(newErrors)
    if (isEmpty(newErrors)) {
      Axios.post('https://isporit.com/api/contact/', {
        ...model,
        subject: `( ${model.role} ) ${model.subject}`,
      })
        .then((res) => {
          // alert(props.t("contactUsOnSubmitSuccess", "Merci! nous vous contacterons dans les prochaines 24h"))
          alert('Merci! nous vous contacterons dans les prochaines 24h')

          setModel({
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            subject: '',
            body: '',
          })
        })
        .catch((e) => {
          if (
            e.response &&
            e.response.data &&
            e.response.data.message === 'Invalid phone number'
          ) {
            return setErrors({ ...errors, phoneNumber: true })
          }
          return alert('something went wrong please try again later!')
        })
    }
  }

  return (
    <>
      <Head>
        <title>{props.t('contactUsHeadTitle', 'Contact Us')}</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="iSporit contact us page " />
        <meta
          name="keywords"
          content="iSporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644"
        />
        <meta name="author" content="iSporit" />
      </Head>

      {/* {
                lang && 
            } */}

      <Layout>
      <div className="contact_us_container">
        <div className="left_side">
          <div className="top_description">
            <h1 className="h1">
              Nous contacter
            </h1>
            <p className="p">
              Envoyez-nous vos informations et nous vous contacterons dans les
              prochaines 24h
            </p>
          </div>

          <div className="form_container">
            <div className="form_item">
              <label htmlFor="prenom">Prenom</label>
              <input
                className={`${errors.firstName ? 'input_error' : ''}`}
                value={model.firstName}
                type="text"
                id="prenom"
                onChange={(e) => {
                  setModel({ ...model, firstName: e.target.value })
                  setErrors({ ...errors, firstName: false })
                }}
                placeholder="John"
              />
            </div>
            <div className="form_item">
              <label htmlFor="Nom">Nom</label>
              <input
                className={`${errors.lastName ? 'input_error' : ''}`}
                value={model.lastName}
                type="text"
                id="Nom"
                onChange={(e) => {
                  setModel({ ...model, lastName: e.target.value })
                  setErrors({ ...errors, lastName: false })
                }}
                placeholder="doe"
              />
            </div>
            <div className="form_item">
              <label htmlFor="E-mail">E-mail</label>
              <input
                className={`${errors.email ? 'input_error' : ''}`}
                value={model.email}
                type="email"
                id="E-mail"
                onChange={(e) => {
                  setModel({ ...model, email: e.target.value })
                  setErrors({ ...errors, email: false })
                }}
                placeholder="contact@isporit.com"
              />
            </div>
            <div className="form_item">
              <label htmlFor="Numero de telephone">Numéro de téléphone</label>
              <input
                className={`${errors.phoneNumber ? 'input_error' : ''}`}
                value={model.phoneNumber}
                type="number"
                id="Numero de telephone"
                onChange={(e) => {
                  setModel({ ...model, phoneNumber: e.target.value })
                  setErrors({ ...errors, phoneNumber: false })
                }}
                placeholder="54162644"
              />
            </div>
            <div style={{ gridRow: 3 }} className="complete_form_item">
              <label htmlFor="role">Role</label>
              <select
                value={model.role}
                onChange={(e) => setModel({ ...model, role: e.target.value })}
              >
                <option value="player">Joueur</option>
                <option value="coach">Entraîneur</option>
                <option value="club">Club</option>
              </select>
            </div>
            <div style={{ gridRow: 4 }} className="complete_form_item">
              <label htmlFor="Quel est l'objectif de votre demande ?">
                Quel est l'objectif de votre demande ?
              </label>
              <input
                className={`${errors.subject ? 'input_error' : ''}`}
                value={model.subject}
                type="text"
                id="Quel est l'objectif de votre demande ?"
                onChange={(e) => {
                  setModel({ ...model, subject: e.target.value })
                  setErrors({ ...errors, subject: false })
                }}
                placeholder="Titre"
              />
            </div>
            <div style={{ gridRow: 5 }} className="complete_form_item">
              <label htmlFor="Message">Message</label>
              <textarea
                className={`${errors.body ? 'input_error' : ''}`}
                value={model.body}
                type="text"
                id="Message"
                rows="8"
                onChange={(e) => {
                  setModel({ ...model, body: e.target.value })
                  setErrors({ ...errors, body: false })
                }}
                placeholder="Message"
              />
            </div>
            <button className="submit" onClick={onSubmit}>
              Envoyer mes informations
            </button>
          </div>
        </div>
        <div className="right_side">
          <div className="empty_block" />
          <p className="contact_description">
            Notre équipe est disponible 24h/7j pour vous répondre et vous
            guider.
          </p>
          <div className="contact_buttons_container">
            <button className="email">contact@isporit.com</button>
            <button className="phone">(+216) 54 162 644</button>
          </div>
        </div>
      </div>
      </Layout>
    </>
  )
}

ContactUs.getInitialProps = async () => {
  return {
    namespacesRequired: ['common'],
  }
}

ContactUs.propTypes = {
  t: PropTypes.func.isRequired,
}
export default withTranslation('common')(ContactUs)
