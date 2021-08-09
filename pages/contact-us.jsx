/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useState } from 'react'
import Head from 'next/head'
import '../shared/css/contact-us.scss'

import Axios from 'axios'

import { message } from 'antd'
import { ORGANIZATIONS_TYPE } from '../shared/constants'
import '../shared/global-style.scss'
import COUNTRIES from '../shared/countries.json'

import Layout from '../shared/components/layout/Layout'

const ContactUs = () => {
  const [model, setModel] = useState({
    role: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    subject: '',
    body: '',
    organizationName: '',
    organizationType: '',
    hearAboutUs: '',
    otherComments: '',
    country: 'TN',
  })
  const [errors, setErrors] = useState({})

  const onSubmit = () => {
    const body = `Organization name: ${model.organizationName} \n Organization type: ${model.organizationType} \n How did you hear about us: ${model.hearAboutUs} \n Other comments: ${model.otherComments} `
    Axios.post('https://isporit.com/api/contact/', {
      ...model,
      body,
      subject: `( ${model.role} - ${model.country} ) ${model.organizationName}`,
    })
      .then(() => {
        // alert(props.t("contactUsOnSubmitSuccess", "Merci! nous vous contacterons dans les prochaines 24h"))
        // alert('Merci! nous vous contacterons dans les prochaines 24h')
        message.success({
          content: 'request sent successfully',
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

  const inputUi = (label, key, type = 'text', required = true, length = 1) => (
    <div className="flex flex-col">
      <label className="text-gray-700 text-base mb-2" htmlFor={label}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        className={`${
          errors[key] ? 'input_error' : ''
        } py-2 px-4 border border-solid border-gray-600 rounded-md text-base text-black`}
        value={model[key]}
        minLength={length}
        type={type}
        id={label}
        onChange={(e) => {
          setModel({ ...model, [key]: e.target.value })
          setErrors({ ...errors, [key]: false })
        }}
        placeholder={label}
        required={required}
      />
    </div>
  )

  const selectUi = (label, key, options, required = true) => (
    <div className="flex flex-col">
      <label className="text-gray-700 text-base mb-2" htmlFor={label}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        className={`${
          errors[key] ? 'input_error' : ''
        } py-2 px-4 border border-solid border-gray-600 rounded-md text-base text-black`}
        value={model[key]}
        id={label}
        onChange={(e) => {
          setModel({ ...model, [key]: e.target.value })
          setErrors({ ...errors, [key]: false })
        }}
        placeholder={label}
        required={required}
      >
        <option value="" disabled selected>
          Select...
        </option>

        {/* <option value={undefined}>Select...</option> */}
        {options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.text}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <>
      <Head>
        <title>Contact Us</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="iSporit contact us page " />
        <meta
          name="keywords"
          content="iSporit,Contactez-nous,contact@isporit.com,(+216) 54 162 644"
        />
        <meta name="author" content="iSporit" />
      </Head>

      <Layout>
        <div className="contact_us_container">
          <div className="left_side">
            <div className="top_description">
              <h1 className="h1">Nous contacter</h1>
              <p className="p">
                {/* Envoyez-nous vos informations et nous vous contacterons dans les
                prochaines 24h */}
                Tell us about yourself and your organization so we can get you
                connected with the right person
              </p>
            </div>

            <form
              className=""
              onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
              }}
            >
              <div className="text-xl text-black font-bold mb-4">
                Tell us about yourself
              </div>
              <div className="sm:flex flex-wrap">
                <div className="flex-1 sm:mr-4 mb-4 ">
                  {inputUi('First name', 'firstName')}
                </div>
                <div className="flex-1 mb-4">
                  {inputUi('Last name', 'lastName')}
                </div>
              </div>
              <div className="sm:flex flex-wrap">
                <div className="flex-1 sm:mr-4 mb-4">
                  {inputUi('Email', 'email', 'email')}
                </div>
                <div className="flex-1 mb-4">
                  {inputUi('Phone number', 'phoneNumber', 'text', true, 6)}
                </div>
              </div>
              <div className="flex ">
                <div className="flex-1 mb-4">
                  {selectUi('Country', 'country', COUNTRIES)}
                </div>
              </div>
              <div className="text-xl text-black font-bold mt-6 mb-4">
                Tell us about your organization
              </div>

              <div className="sm:flex flex-wrap">
                <div className="flex-1 sm:mr-4 mb-4">
                  {inputUi(
                    'Organization name',
                    'organizationName',
                    'text',
                    false,
                  )}
                </div>
                <div className="flex-1 mb-4">
                  {selectUi(
                    'Organization type',
                    'organizationType',
                    ORGANIZATIONS_TYPE,
                    false,
                  )}
                </div>
              </div>

              <div className="sm:flex flex-wrap">
                <div className="flex-1 sm:mr-4 mb-4">
                  {inputUi('Role on team', 'role', 'text', false)}
                </div>
                <div className="flex-1 mb-4">
                  {inputUi(
                    'How did you hear about us?',
                    'hearAboutUs',
                    'text',
                    false,
                  )}
                </div>
              </div>
              <div className="sm:flex flex-wrap">
                <div className="flex-1 mb-4">
                  {inputUi('Other comments', 'otherComments', 'text', false)}
                </div>
              </div>
              <button
                className="w-full bg-primary  text-white text-xl py-2 rounded-xl"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
          <div className="right_side">
            <div className="empty_block" />
            <p className="contact_description">
              Notre équipe est disponible 24h/7j pour vous répondre et vous
              guider.
            </p>
            <div className="contact_buttons_container">
              <button type="button" className="email">
                contact@isporit.com
              </button>
              <button type="button" className="phone">
                (+216) 54 162 644
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ContactUs
