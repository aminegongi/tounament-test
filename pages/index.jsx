import React from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import FacebookPixel from '../shared/components/FacebookPixel'
import Layout from '../shared/components/layout/Layout'
import '../shared/css/index.scss'
import routes from '../utils/routes'

const Index = () => {
  const data = [
    {
      link: `${routes.COACHES_LIST.path}?onlineOffers=true`,
      title: 'En ligne',
    },
    {
      link: `${routes.COACHES_LIST.path}?job=fitnessCoach`,

      title: 'Fitness',
    },
    {
      link: `${routes.COACHES_LIST.path}?job=yogaTeacher`,

      title: 'Yoga',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=tennis`,

      title: 'Tennis',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=boxing`,

      title: 'Boxe',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=swimming`,

      title: 'Natation',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=volleyball`,

      title: 'Volleyball',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=basketball`,

      title: 'Basketball',
    },
    {
      link: `${routes.COACHES_LIST.path}?job=pilatesCoach`,

      title: 'Pilates',
    },
    {
      link: `${routes.COACHES_LIST.path}?specialty=soccer`,

      title: 'Football',
    },
    {
      link: `${routes.COACHES_LIST.path}?job=physicalTrainer`,

      title: 'Préparateur physique',
    },
  ]

  return (
    <>
      <Head>
        <title>iSporit</title>
        <FacebookPixel />
      </Head>
      <Layout>
        <div className="index-page">
          <div className="index-page__all-sports">
            <div className="index-page__all-sports__head">
              <h1>TOUS NOS COACHS</h1>
              <div className="index-page__all-sports__see-all">
                <Link href={routes.COACHES_LIST.path}>
                  <a href={routes.COACHES_LIST.path}>Voir tout</a>
                </Link>
              </div>
            </div>

            <div className="index-page__sport-cards-container">
              {data.map((el) => (
                <Link href={el.link}>
                  <a href={el.link}>
                    <div className="index-page__sport-cards-container__card">
                      {el.title}
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Index
