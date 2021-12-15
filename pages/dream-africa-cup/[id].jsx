import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Tabs, Tag, Table } from 'antd'
import moment from 'moment'
import { onSnapshot, collection } from 'firebase/firestore'
import { useMediaPredicate } from 'react-media-hook'
import firebaseDb from '../../firebase.config'
import routes from '../../utils/routes'
import dreamAfricaCup from '../../public/dream-africa.png'
import logoImg from '../../public/icon/logoindexpage.png'

function TournamentDetails() {
  const [tournamentDetails, setTournamentDetails] = useState()
  const [teams, setTeams] = useState([])
  console.log('tournamentDetails: ', tournamentDetails)
  const isMobile = useMediaPredicate('(max-width: 600px)')
  console.log('isMobile: ', isMobile)

  const router = useRouter()
  useEffect(() => {
    onSnapshot(collection(firebaseDb, 'tournaments'), (snap) => {
      const result = snap.docs.find((el) => router.query.id === el.id)
      if (result) {
        setTournamentDetails({
          ...result.data(),
          groupStages:
            result.data().groupStages &&
            result.data().groupStages.map((g) => ({
              ...g,
              teams: g.teams.map((tid) => {
                return {
                  id: tid,
                  ...g.teams.reduce(
                    (acc) => {
                      const wins =
                        result.data().matches &&
                        result
                          .data()
                          .matches.filter(
                            (m) =>
                              m.status === 'closed' &&
                              m.round.type === 'groupStages' &&
                              ((m.team1 === tid && m.score[0] > m.score[1]) ||
                                (m.team2 === tid && m.score[1] > m.score[0])),
                          ).length
                      const draws =
                        result.data().matches &&
                        result
                          .data()
                          .matches.filter(
                            (m) =>
                              m.status === 'closed' &&
                              m.round.type === 'groupStages' &&
                              (m.team1 === tid || m.team2 === tid) &&
                              m.score[0] === m.score[1],
                          ).length
                      const losses =
                        result.data().matches &&
                        result
                          .data()
                          .matches.filter(
                            (m) =>
                              m.status === 'closed' &&
                              m.round.type === 'groupStages' &&
                              ((m.team1 === tid && m.score[0] > m.score[1]) ||
                                (m.team2 === tid && m.score[1] > m.score[0])),
                          ).length

                      const goalsFor =
                        result.data().matches &&
                        result.data().matches.reduce((gAcc, gVal) => {
                          if (
                            gVal.status === 'closed' &&
                            gVal.round.type === 'groupStages' &&
                            (gVal.team1 === tid || gVal.team2 === tid)
                          ) {
                            const goals =
                              gVal.team1 === tid ? gVal.score[0] : gVal.score[1]
                            gAcc += goals
                          }
                          return gAcc
                        }, 0)
                      const goalsAgainst =
                        result.data().matches &&
                        result.data().matches.reduce((gAcc, gVal) => {
                          if (
                            gVal.status === 'closed' &&
                            gVal.round.type === 'groupStages' &&
                            (gVal.team1 === tid || gVal.team2 === tid)
                          ) {
                            const goals =
                              gVal.team1 === tid ? gVal.score[1] : gVal.score[0]
                            gAcc += goals
                          }
                          return gAcc
                        }, 0)
                      acc = {
                        ...acc,
                        wins,
                        draws,
                        losses,
                        goalsFor,
                        goalsAgainst,
                        goalsDifference: goalsFor - goalsAgainst,
                        points: wins * 3 + draws,
                      }

                      return acc
                    },
                    {
                      wins: 0,
                      draws: 0,
                      losses: 0,
                      points: 0,
                    },
                  ),
                }
              }),
            })),
        })
      }
    })
    onSnapshot(collection(firebaseDb, 'teams'), (snap) => {
      setTeams(snap.docs.map((el) => ({ ...el.data(), id: el.id })))
    })
  }, [])
  if (!tournamentDetails) {
    return <div className="" />
  }
  return (
    <div className="bg-white">
      <div className="flex justify-between p-4 items-center">
        <Link href={routes.HOME.path}>
          <a href={routes.HOME.path}>
            <img src={logoImg} alt="logo" />
          </a>
        </Link>
        <div className="text-black font-bold">{tournamentDetails.title}</div>
        <button
          onClick={() => router.push(routes.CONTACT_US.path)}
          type="button"
          className="isporit-primary-button"
          style={{ padding: '10px' }}
        >
          Contact
        </button>
      </div>
      <div className="">
        <img className="w-full" src={dreamAfricaCup} alt="" />
      </div>
      <div className="">
        <Tabs defaultActiveKey="2">
          <Tabs.TabPane tab="Matchs" key="1">
            {tournamentDetails.matches
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((el) => {
                const team1 = teams.find((t) => t.id === el.team1)
                const team2 = teams.find((t) => t.id === el.team2)
                const round = () => {
                  if (el.round.type === 'groupStages') {
                    return tournamentDetails.groupStages.find(
                      (g) => g.id === el.round.round_id,
                    )
                  }
                }
                return (
                  <div className="border rounded-md m-1 p-4 border-gray-300 mb-10">
                    <div className="flex justify-between">
                      <div className="">
                        {el.status === 'onGoing' ? (
                          <Tag color="red">Live</Tag>
                        ) : (
                          moment(el.date).format('LLLL')
                        )}
                      </div>
                      <div className="">
                        {round() && <Tag>{round().title}</Tag>}
                      </div>
                    </div>
                    <div className="">
                      <div className="flex justify-between items-center my-3">
                        <div className="flex items-center">
                          <img
                            className="w-10 mr-2"
                            src={team1 && team1.logo}
                            alt=""
                          />
                          <div className="capitalize text-black text-base ">
                            {team1 && team1.title}
                          </div>
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            el.status === 'closed' &&
                            el.score[0] > el.score[1] &&
                            'text-green-600'
                          }
                        ${
                          el.status === 'closed' &&
                          el.score[0] < el.score[1] &&
                          'text-red-600'
                        }`}
                        >
                          {el.status !== 'planned' && el.score && el.score[0]}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            className="w-10 mr-2"
                            src={team2 && team2.logo}
                            alt=""
                          />
                          <div className="capitalize text-black text-base">
                            {team2 && team2.title}
                          </div>
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            el.status === 'closed' &&
                            el.score[0] < el.score[1] &&
                            'text-green-600'
                          }
                        ${
                          el.status === 'closed' &&
                          el.score[0] > el.score[1] &&
                          'text-red-600'
                        }`}
                        >
                          {el.status !== 'planned' && el.score && el.score[1]}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Groupes" key="2">
            {tournamentDetails.groupStages.map((el) => (
              <div key={el.id} className="mb-10 capitalize">
                <div className="ml-2 text-black mb-1 font-bold">{el.title}</div>
                <div className="">
                  <div className="">
                    <Table
                      pagination={false}
                      dataSource={el.teams.sort((a, b) => b.points - a.points)}
                      scroll={isMobile ? { x: 500 } : {}}
                      columns={[
                        {
                          title: 'Club',
                          dataIndex: 'id',
                          key: 'id',
                          fixed: 'left',
                          width: isMobile ? 200 : '',
                          render: (teamId) => {
                            const team = teams.find((t) => t.id === teamId)
                            if (!team) {
                              return ''
                            }
                            return (
                              <div className="flex items-center">
                                <img
                                  className="h-8 mr-2"
                                  src={team.logo}
                                  alt=""
                                />
                                <div className="">{team.title}</div>
                              </div>
                            )
                          },
                        },
                        {
                          title: 'G',
                          dataIndex: 'wins',
                          key: 'wins',
                          width: 30,
                        },
                        {
                          title: 'N',
                          dataIndex: 'draws',
                          key: 'draws',
                          width: 30,
                        },
                        {
                          title: 'P',
                          dataIndex: 'losses',
                          key: 'losses',
                          width: 30,
                        },
                        {
                          title: 'Pts',
                          dataIndex: 'points',
                          key: 'points',
                          width: 60,
                        },
                        {
                          title: 'BP',
                          dataIndex: 'goalsFor',
                          key: 'goalsFor',
                          width: 55,
                        },
                        {
                          title: 'BC',
                          dataIndex: 'goalsAgainst',
                          key: 'goalsAgainst',
                          width: 55,
                        },

                        {
                          title: 'DB',
                          dataIndex: 'goalsDifference',
                          key: 'goalsDifference',
                          width: 55,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="Final" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane> */}
        </Tabs>
      </div>
    </div>
  )
}

export default TournamentDetails
