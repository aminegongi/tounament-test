import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { onSnapshot, collection } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Icon } from 'antd'
import routes from '../utils/routes'
import logoImg from '../public/icon/logoindexpage.png'
import dreamAfricaCup from '../public/dream-africa.png'
import firebaseDb from '../firebase.config'

function DreamAfricaTournamentPage(params) {
  const router = useRouter()
  const [teams, setTeams] = useState([])
  const [config, setConfig] = useState([])
  const onChangeLocation = (link) => {
    router.push(link)
  }
  const [tournaments, setTournaments] = useState([])
  useEffect(() => {
    onSnapshot(collection(firebaseDb, 'tournaments'), (snap) => {
      setTournaments(snap.docs.map((el) => ({ ...el.data(), id: el.id })))
    })
    onSnapshot(collection(firebaseDb, 'config'), (snap) => {
      setConfig(snap.docs.map((el) => ({ ...el.data(), id: el.id })))
    })
    onSnapshot(collection(firebaseDb, 'teams'), (snap) => {
      setTeams(snap.docs.map((el) => ({ ...el.data(), id: el.id })))
    })
    if (router.query.isDreamAfricaAdmin) {
      localStorage.setItem(
        'isDreamAfricaAdmin',
        router.query.isDreamAfricaAdmin,
      )
    }
  }, [])
  return (
    <>
      <Head>
        {/* <title>iSporit - trouver un coach sportif ou un coach de yoga</title> */}
      </Head>
      <div className="pb-5 bg-white">
        {/* <div className="flex justify-between p-4 items-center">
          <Link href={routes.HOME.path}>
            <a href={routes.HOME.path}>
              <img src={logoImg} alt="logo" />
            </a>
          </Link>
          <button
            onClick={() => onChangeLocation(routes.CONTACT_US.path)}
            type="button"
            className="isporit-primary-button"
            style={{ padding: '10px' }}
          >
            Contact
          </button>
        </div> */}
        <div className="">
          <img className="w-full" src={config[0] && config[0].header} alt="" />
        </div>
        <div className="">
          {tournaments.map((el) => (
            <Link href={{ pathname: `/${el.id}` }} type="button" key={el.id}>
              <a
                className="flex justify-between items-center border rounded-md m-4 p-4"
                href={`d/${el.id}`}
              >
                <div className="text-black font-bold">{el.title}</div>
                <div className="">
                  <Icon type="right" />
                </div>
              </a>
            </Link>
          ))}
        </div>
        <div className="font-bold m-5 text-base text-center">Les equipes</div>
        <div className="">
          {teams.map((el) => (
            <div className="flex items-center m-4 p-4 bg-white">
              <img className="h-14 mr-5" src={el.logo} alt="" />
              <div className="capitalize font-bold text-lg">{el.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DreamAfricaTournamentPage
