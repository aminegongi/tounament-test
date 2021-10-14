/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { Icon } from 'antd'
import { useRouter } from 'next/router'
import FacebookPixel from '../../shared/components/FacebookPixel'
import '../../shared/css/index.scss'
import Layout from '../../shared/components/layout/Layout'
import routes from '../../utils/routes'

import onLigneIcon from '../../public/index-icons/en ligne.png'
import boxeIcon from '../../public/index-icons/boxe.png'
import basketIcon from '../../public/index-icons/basket.png'
import fitnessIcon from '../../public/index-icons/fitness.png'
import footIcon from '../../public/index-icons/foot.png'
import natationIcon from '../../public/index-icons/natation.png'
import pilateIcon from '../../public/index-icons/pilate.png'
import prepPhycon from '../../public/index-icons/prep phy.png'
import tennisIcon from '../../public/index-icons/tennis.png'
import volleyIcon from '../../public/index-icons/volley.png'
import yogaIcon from '../../public/index-icons/yoga.png'

import basketBg from '../../public/index-icons/basketBg.png'
import boxeBg from '../../public/index-icons/boxeBg.png'
import footBg from '../../public/index-icons/footBg.png'
import onLigneBg from '../../public/index-icons/onlineBg.png'
import pilateBg from '../../public/index-icons/pilateBg.png'
import fitnessBg from '../../public/index-icons/fitnessBg.png'
import tennisBg from '../../public/index-icons/tennisBg.png'
import natationBg from '../../public/index-icons/natationBg.png'
import prepPhyBg from '../../public/index-icons/prepPhyBg.png'
import yogaBg from '../../public/index-icons/yogaBg.jpg'
import volleyBg from '../../public/index-icons/volleyBg.png'

const Index = () => {
  const data = [
    {
      link: `${routes.COACHES_LIST.path}?onlineSession=true`,
      title: 'En ligne',
      icon: onLigneIcon,
      background: onLigneBg,
    },
    {
      link: `${routes.COACHES_LIST.path}?job=fitnessCoach`,
      icon: fitnessIcon,
      background: fitnessBg,

      title: 'Fitness',
    },
    {
      link: `${routes.COACHES_LIST.path}?job=yogaTeacher`,
      icon: yogaIcon,
      background: yogaBg,

      title: 'Yoga',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=tennis`,
      icon: tennisIcon,
      background: tennisBg,

      title: 'Tennis',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=boxing`,
      icon: boxeIcon,
      background: boxeBg,

      title: 'Boxe',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=swimming`,
      icon: natationIcon,
      background: natationBg,

      title: 'Natation',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=volleyball`,
      icon: volleyIcon,
      background: volleyBg,

      title: 'Volleyball',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=basketball`,
      icon: basketIcon,
      background: basketBg,

      title: 'Basketball',
    },
    {
      link: `${routes.COACHES_LIST.path}?job=pilatesCoach`,
      icon: pilateIcon,
      background: pilateBg,

      title: 'Pilates',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=soccer`,
      icon: footIcon,
      background: footBg,

      title: 'Football',
    },
    {
      link: `${routes.COACHES_LIST.path}?job=physicalTrainer`,
      icon: prepPhycon,
      background: prepPhyBg,

      title: 'Préparateur physique',
    },
  ]

  const [searchText, setSearchText] = useState('')
  const { push } = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()
    push(`${routes.COACHES_LIST.path}?searchByName=${searchText}`)
  }

  return (
    <>
      <Head>
        <title>iSporit - trouver un coach sportif ou un coach de yoga</title>

        <meta
          name="description"
          content="A la recherche d'un coach sportif en Tunisie? Vous voulez faire du sport (tennis, natation, fitness, boxe, football, volley-ball, ...) mais vous ne savez pas par où commencer? Vous voulez faire du yoga mais vous ne savez pas qui contacter?
 iSporit vous offre la possibilité de choisir votre coach selon vos propres critères. Trouvez votre coach/entraîneur en Tunisie en seulement 3 clics"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://isporit.com" />
        <meta
          property="og:description"
          content="A la recherche d'un coach sportif? Vous voulez faire du sport mais vous ne savez pas par où commencer? Vous voulez faire du yoga mais vous ne savez pas qui contacter?
 iSporit vous offre la possibilité de choisir votre coach selon vos propres critères. "
        />
        <meta
          property="og:image"
          content="https://isporit.com/logo_isporit_final.png"
        />
        <link rel="canonical" href="https://isporit.com/coaches/sport" />
        <FacebookPixel />
      </Head>
      <Layout>
        <section className="lg:pt-28 sm:mx-8 mx-2 pt-8 ">
          <h1 className="sm:text-4xl text-center mt-4 font-semibold text-2xl">
            Trouvez votre coach
          </h1>
          <section className="flex justify-center">
            <form onSubmit={onSubmit} className="w-full relative">
              <input
                className="w-full p-4 rounded-3xl border-primary border-solid border focus:outline-none"
                placeholder="Recherche par nom"
                type="text"
                name=""
                id=""
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="absolute right-4 top-4 " type="submit">
                <Icon className="text-xl leading-none" type="search" />
              </button>
            </form>
          </section>

          <div className="text-base text-center font-medium mr-1 mt-5">
            <Link href={routes.COACHES_LIST.path}>
              <a className="text-black " href={routes.COACHES_LIST.path}>
                Voir tous les coachs
              </a>
            </Link>
          </div>
          <div className="flex mt-4 justify-between flex-wrap  ">
            {data.map((el) => (
              <Link key={el.title} href={el.link}>
                <a
                  className="relative w-48 h-48 rounded-xl flex justify-center items-center flex-col  bg-cover bg-center  mx-1 my-2 flex-auto "
                  style={{
                    backgroundImage: `url(${el.background})`,
                  }}
                  href={el.link}
                >
                  <img className="w-12 h-12 mb-3 z-10" src={el.icon} alt="" />
                  <div className="text-base text-white z-10 text-center">
                    {el.title}
                  </div>
                  <div className="w-full h-full bg-black rounded-xl bg-opacity-60 absolute top-0 left-0 " />
                </a>
              </Link>
            ))}
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Index
