import React, { useState } from 'react'
import ContactUs from '../shared/components/IndexPage/ContactUs'
import PlatformDetails from '../shared/components/IndexPage/PlatformDetails'
import Layout from '../shared/components/layout/Layout'
import { Link as ScrollLink } from 'react-scroll'
import '../shared/css/index.scss'
import { useMediaPredicate } from 'react-media-hook'
import Axios from 'axios'
import { message } from 'antd'
import Head from 'next/head'
import FacebookPixel from '../shared/components/FacebookPixel'


const Index = () => {
  const isMobile = useMediaPredicate('(max-width: 992px)')
  const [model, setModel] = useState({
    role: '',
    email: '',
    firstName: '-',
    lastName: '-',
    phoneNumber: '',
    subject: 'Demande de demo',
    body: '-',
    organizationName: '',
    organizationType: '',
    hearAboutUs: '',
    otherComments: '',
    city: '',
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
        message.success({
          content:
            'E-mail envoyé avec succès. Notre équipe commercial vous contactera dans le plus brefs délais',
          duration: 5,
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
    <>
      <Head>
        <title>iSporit - gestion de clubs sportifs - stats de football</title>

        <meta
          name="description"
          content="iSporit vous propose une application web et mobile qui permet au club/coach de suivre ses joueurs,
           de manière efficace, et sur plusieurs années en se basant sur l'analyse vidéo"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://isporit.com" />
        <meta
          property="og:description"
          content="iSporit vous propose une application web et mobile qui permet au club/coach de suivre ses joueurs,
           de manière efficace, et sur plusieurs années en se basant sur l'analyse vidéo"
        />
        <meta
          property="og:image"
          content="https://isporit.com/logo_isporit_final.png"
        />
        <link rel="canonical" href="https://isporit.com" />
        <FacebookPixel />
      </Head>
      <div className="index-page">
        <Layout childrenClassName="bg-white " isMainPage>
          <div
            style={{
              backgroundImage: 'url(/index-cover.png)',
            }}
            className="bg-cover"
          >
            <div
              className="max-w-7xl m-auto flex justify-between 
          py-12 px:4 md:px-16 items-center"
            >
              <div className="hidden md:block max-w-lg">
                <div
                  className="md:text-2xl lg:text-3xl xl:text-4xl 
              text-white font-bold  mb-4"
                >
                  Suivez les performances de vos joueurs de près
                </div>
                <div
                  className="w-16 border-b-4 border-solid mb-6"
                  style={{ borderColor: '#ffc651' }}
                />
                <div className="text-xl text-white font-bold">
                  iSporit vous propose une application web et mobile qui permet
                  au club/coach de suivre ses joueurs, de manière efficace, et
                  sur plusieurs années
                </div>
              </div>
              <div
                style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}
                className="z-10 m-auto md:m-0
              md:ml-10 max-w-sm pt-9 pb-9 px-9  rounded-xl relative"
              >
                {/* <div className="absolute top-0 left-0 w-full h-full  bg-gray-700" /> */}
                <div className=" text-white text-center font-bold mb-4">
                  <div className="text-sm">Essayez</div>
                  <div className="text-2xl ">gratuitement</div>
                  <div className="text-sm">notre application de</div>
                  <div className="text-xl">gestion des clubs sportifs</div>
                  <br />
                </div>
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
                    } isporit-input rounded-xl mb-5`}
                    placeholder="Nom de l'équipe"
                    type="text"
                    onChange={(e) => {
                      setModel({ ...model, organizationName: e.target.value })
                      setErrors({ ...errors, organizationName: false })
                    }}
                  />
                  <input
                    className={`${
                      errors['email'] ? 'input_error' : ''
                    } isporit-input rounded-xl mb-5`}
                    placeholder="Email"
                    type="email"
                    onChange={(e) => {
                      setModel({ ...model, email: e.target.value })
                      setErrors({ ...errors, email: false })
                    }}
                  />
                  <input
                    className={`${
                      errors['phoneNumber'] ? 'input_error' : ''
                    } isporit-input rounded-xl mb-5`}
                    placeholder="N° téléphone"
                    type="text"
                    onChange={(e) => {
                      setModel({ ...model, phoneNumber: e.target.value })
                      setErrors({ ...errors, phoneNumber: false })
                    }}
                  />
                  <input
                    className={`${
                      errors['city'] ? 'input_error' : ''
                    } isporit-input rounded-xl mb-5`}
                    type="text"
                    placeholder="Ville"
                    onChange={(e) => {
                      setModel({ ...model, city: e.target.value })
                      setErrors({ ...errors, city: false })
                    }}
                  />
                  <button
                    className="w-full bg-primary text-white text-base md:text-xl py-2 rounded-xl"
                    type="submit"
                  >
                    Contactez nous
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="my-12 flex flex-col md:flex-row max-w-7xl m-auto bg-white px-9">
            <div className="flex-1 flex flex-col justify-center items-center pb-9 md:pb-0 mr-5">
              <img
                src="/index-coach-player.png"
                alt=""
                className="rounded-xl mb-4 h-60"
              />
              <img src="/index-icons/coach.png" alt="" />
              <div
                className="text-2xl lg:text-2xl font-bold "
                style={{ color: '#212121' }}
              >
                Pour le coach
              </div>
              <div
                className="max-w-sm font-medium text-base lg:text-lg text-justify mb-4 mt-4"
                style={{ color: '#212121' }}
              >
                iSporit offre au coach sportif une plateforme de suivi détaillé
                de ses joueurs. Cette plateforme facilite la fixation des
                objectifs pour chaque joueur, le suivi de ses séances,...
              </div>
              <ScrollLink to="contact" smooth={true} duration={800}>
                <button
                  type="button"
                  className="bg-primary  text-white text-base lg:text-xl py-2.5 rounded-xl px-8"
                >
                  Demander une démo
                </button>
              </ScrollLink>
            </div>
            <div className="flex-1  flex flex-col justify-center items-center ">
              <img src="/index-team.png" alt="" className="rounded-xl mb-4" />
              <img src="/index-icons/team.png" alt="" />
              <div
                className="text-2xl lg:text-2xl font-bold "
                style={{ color: '#212121' }}
              >
                Pour les clubs / académies
              </div>
              <div
                className="max-w-sm font-medium text-base lg:text-lg text-justify mb-4  mt-4"
                style={{ color: '#212121' }}
              >
                iSporit offre une panoplie d'outils pour le club allant de la
                simple gestion des groupes et des présences des joueurs jusqu'à
                une anlayse détaillée des performances basée sur les vidéos.
              </div>
              <ScrollLink to="contact" smooth={true} duration={800}>
                <button
                  type="button"
                  className="bg-primary  text-white text-base lg:text-xl py-2.5 rounded-xl px-8"
                >
                  Demander une démo
                </button>
              </ScrollLink>
            </div>
          </div>
          <div
            className=" py-12 pb-12 flex flex-col items-center px-9"
            style={{ background: '#f8f8f8' }}
          >
            <div
              className="text-2xl md:text-3xl font-bold text-center"
              style={{ color: '#212121' }}
            >
              La meilleure plateforme pour la gestion des talents
            </div>
            <div
              className="w-16 border-b-4 border-solid mt-2 mb-4"
              style={{ borderColor: '#ffc651' }}
            />
            <div
              className="max-w-2xl font-medium text-base md:text-lg mb-2 text-center"
              style={{ color: '#212121' }}
            >
              iSporit vise à aider les clubs et les coachs pour la détection des
              talents grâce à une base de données riche décrivant les
              performances de chaque joueur tout au long des années de la vie
              sportive du joueur.
            </div>
            <ScrollLink to="contact" smooth={true} duration={800}>
              <button
                type="button"
                className="bg-primary text-white text-base md:text-xl py-2.5 rounded-xl px-8"
              >
                Contactez-nous pour une prise de rendez-vous
              </button>
            </ScrollLink>
            <div className="mt-8 hidden md:block">
              <img
                src="/mobile_interfaces.png"
                alt=""
                className="rounded-xl mb-4"
              />
            </div>
          </div>
          <div className="py-12 pb-12 flex flex-col items-center px-9">
            <div
              className="text-2xl md:text-3xl font-bold text-center"
              style={{ color: '#212121' }}
            >
              Une plateforme d'analyse des matchs de football
            </div>
            <div
              className="w-16 border-b-4 border-solid mt-2 mb-4"
              style={{ borderColor: '#ffc651' }}
            />
            <div
              className="max-w-2xl font-medium text-base md:text-lg mb-2 text-center"
              style={{ color: '#212121' }}
            >
              Notre plateforme vous permet d'extraire entre les mi-temps les
              statistiques sur les balles jouées, les zones de récupération de
              balles, les performances de chaque joueur...
            </div>

            <div className="flex justify-between w-full max-w-2xl mt-3">
              <div
                style={{ color: '#ff8760' }}
                className="  font-bold text-center"
              >
                <div className="text-lg md:text-3xl mb-1">+20</div>
                <div className="text-sm md:text-2xl">types de statistiques</div>
              </div>
              <div
                style={{ color: '#ff8760' }}
                className="  font-bold text-center"
              >
                <div className="text-lg md:text-3xl mb-1">+25</div>
                <div className="text-sm md:text-2xl">heures de stockage</div>
              </div>
              <div
                style={{ color: '#ff8760' }}
                className="  font-bold text-center"
              >
                <div className="text-lg md:text-3xl mb-1">+5</div>
                <div className="text-sm md:text-2xl">rapports de match</div>
              </div>
            </div>
          </div>
          <div className=" " style={{ background: '#f8f8f8' }}>
            <div className="py-12 m-auto max-w-7xl px-9">
              <div className="mb-12">
                <PlatformDetails
                  reversedStyle="sm:flex-row"
                  title="S'adapte à tout club de football"
                  description="iSporit travaille avec des équipes amateurs ou professionnelles, 
                de petites tailles ou de grande tailles."
                  image="\libraryMatches.png"
                >
                  {/* <Radio.Group
                  className="flex flex-col  mb-4 index-page__radio-button text-lg "
                  size="large"
                  options={[
                    'Académie mono-site',
                    'Académie multi-sites',
                    'Clubs civils (circuit professionnel)',
                  ]} 
                /> */}
                  <div className="flex flex-col">
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Académie mono-site</div>
                    </div>
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Académie multi-sites</div>
                    </div>
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Club civil (circuit professionnel)</div>
                    </div>
                  </div>
                  <ScrollLink to="contact" smooth={true} duration={800}>
                    <button
                      type="button"
                      className="bg-primary  text-white  text-base md:text-xl py-2.5 rounded-xl px-11 mt-5"
                    >
                      Contactez nous
                    </button>
                  </ScrollLink>
                </PlatformDetails>
              </div>
              <div className="mb-12">
                <PlatformDetails
                  reversedStyle="sm:flex-row-reverse"
                  title="Chaque détail compte dans le football"
                  description="Suivez tous les détails des matchs à partir 
                d'une seule et unique plateforme accessible à tout moment, n'importe où"
                  image="\sequences.png"
                >
                  {/* <Radio.Group
                  className="flex flex-col  mb-4 index-page__radio-button text-lg "
                  size="large"
                  options={[
                    'Système de statistiques simple et détaillé',
                    'Bibilothèque des vidéos de tous vos matchs',
                    'Extraction automatique des séquences',
                  ]} 
                /> */}
                  <div className="flex flex-col">
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Système de stats simple et détaillé</div>
                    </div>
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Bibilothèque des vidéos des matchs</div>
                    </div>
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Extraction automatique des séquences</div>
                    </div>
                  </div>
                  <ScrollLink to="contact" smooth={true} duration={800}>
                    <button
                      type="button"
                      className="bg-primary  text-white text-base md:text-xl py-2.5 rounded-xl px-11 mt-5"
                    >
                      Contactez nous
                    </button>
                  </ScrollLink>
                </PlatformDetails>
              </div>
              <div>
                <PlatformDetails
                  reversedStyle="sm:flex-row"
                  title="Suivi de toute académie sportive quelque soit le sport"
                  description="Notre plateforme permet la gestion de tout club sportif : tennis, natation, football, gymnastique, arts martiaux, ..."
                  image="\dashboard.png"
                >
                  {/* <Radio.Group
                  className="flex flex-col  mb-4 index-page__radio-button text-lg "
                  size="large"
                  options={[
                    'Présence de joueurs',
                    'Programme des séances',
                    'Plans annuels',
                  ]} 
                  /> */}
                  <div className="flex flex-col">
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Présence de joueurs</div>
                    </div>
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Programme des séances</div>
                    </div>
                    <div className="flex">
                      <div>
                        <img src="\radio.png" className="mr-1" />
                      </div>
                      <div>Plans annuels</div>
                    </div>
                  </div>
                  <ScrollLink to="contact" smooth={true} duration={800}>
                    <button
                      type="button"
                      className="bg-primary  text-white text-base md:text-xl py-2.5 rounded-xl px-11 mt-5"
                    >
                      Contactez nous
                    </button>
                  </ScrollLink>
                </PlatformDetails>
              </div>
            </div>
          </div>
          <div className="m-auto max-w-7xl py-12" id="contact">
            <ContactUs />
          </div>
        </Layout>
      </div>
    </>
  )
}

export default Index
