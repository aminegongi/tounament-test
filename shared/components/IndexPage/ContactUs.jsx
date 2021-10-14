import React, {useState} from 'react'
import Axios from 'axios'
import { message } from 'antd'
import './contact-us.scss'

export default function ContactUs(params) {
  const [model, setModel] = useState({
    role: '',
    email: '',
    firstName: '',
    lastName: '-',
    phoneNumber: '',
    subject: 'Demande de demo',
    body: '-',
    organizationName: '',
    organizationType: '',
    hearAboutUs: '',
    otherComments: '',
    city:'',
    country: 'TN',
  })
  const [errors, setErrors] = useState({})

  const onSubmit = () => {
    const body = `Organization name: ${model.organizationName} \n Contact Person: ${model.firstName} \n Phone number: ${model.phoneNumber} \n City: ${model.city} `
    Axios.post('https://isporit.com/api/contact/', {
      ...model,
      body,
      subject: `( Demo request - ${model.firstName} ) ${model.organizationName}`,
    })
      .then(() => {
        // alert(props.t("contactUsOnSubmitSuccess", "Merci! nous vous contacterons dans les prochaines 24h"))
        // alert('Merci! nous vous contacterons dans les prochaines 24h')
        message.success({
          content: 'E-mail envoyé avec succès. Notre équipe commercial vous contactera dans le plus brefs délais',
          duration:5
        })
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.data &&
          e.response.data.message === 'Invalid phone number'
        ) {
          message.error({
            content: 'Saisir un numéro de téléphone valide',
          })
          return setErrors({ ...errors, phoneNumber: true })
        }
        if (
          e.response &&
          e.response.data &&
          e.response.data.message === 'Invalid email'
        ) {
          message.error({
            content: 'Saisir un email valide',
          })
          return setErrors({ ...errors, email: true })
        }

        message.error({
          content: 'Tous les champs sont obligatoires.',
        })
        
        // return alert('something went wrong please try again later!')
      })
  }

  return (
    <div className="contact-us-form py-10 w-full flex flex-col items-center">
      {/* <div
        className="max-w-md text-3xl font-bold text-center "
        style={{
          color: '#212121',
        }}
      >
        Take your team to the next level with isporit
      </div> */}
      <div className="text-3xl font-bold mt-14" style={{ color: '#2a2a2a' }}>
        Contact
      </div>
      <div
        className="w-16 border-b-4  border-solid mt-2"
        style={{ borderColor: '#ffc651' }}
      />
      <div className="py-10 px-9 md:px-28  w-full">
        <div className="py-12 px-9 md:px-40" style={{ background: '#f8f8f8' }}>
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            <input
              className={`${
                errors['organizationName'] ? 'input_error' : ''
              } w-full py-3 px-7 text-base rounded-xl border-none mb-4`}
              type="text"
              placeholder="Nom du club"
              onChange={(e) => {
                setModel({ ...model, organizationName: e.target.value })
                setErrors({ ...errors, organizationName: false })
              }}
              required
            />
            <input
              className={`${
                errors['firstName'] ? 'input_error' : ''
              } w-full py-3 px-7 text-base rounded-xl border-none mb-4`}
              type="text"
              placeholder="Personne à contacter"
              onChange={(e) => {
                setModel({
                  ...model,
                  firstName: e.target.value,
                })
                setErrors({ ...errors, firstName: false })
              }}
              required
            />
            <input
              className={`${
                errors['email'] ? 'input_error' : ''
              } w-full py-3 px-7 text-base rounded-xl border-none mb-4`}
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setModel({
                  ...model,
                  email: e.target.value,
                })
                setErrors({ ...errors, email: false })
              }}
              required
            />
            <input
              className={`${
                errors['phoneNumber'] ? 'input_error' : ''
              } w-full py-3 px-7 text-base rounded-xl border-none mb-4`}
              type="text"
              placeholder="N° téléphone"
              onChange={(e) => {
                setModel({
                  ...model,
                  phoneNumber: e.target.value,
                })
                setErrors({ ...errors, phoneNumber: false })
              }}
              required
            />
            <input
              className={`${
                errors['city'] ? 'input_error' : ''
              } w-full py-3 px-7 text-base rounded-xl border-none mb-4`}
              type="text"
              placeholder="Ville"
              onChange={(e) => {
                setModel({
                  ...model,
                  city: e.target.value,
                })
                setErrors({ ...errors, city: false })
              }}
              required
            />

            <button
              className="w-full bg-primary  text-white text-xl py-2 rounded-xl"
              type="submit"
            >
              Contactez nous
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
