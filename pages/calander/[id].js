import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { Modal, Button } from 'antd';

import "react-big-calendar/lib/css/react-big-calendar.css";
import fetch from 'isomorphic-unfetch'
import { useRouter } from "next/router";
import { API } from '../../shared/constants'
import InfoCoach from '../../shared/components/InfoCoach/InfoCoach';
import '../../shared/css/calander.scss'
import Navbar from '../../shared/components/navbar/Navbar';
import ContactCoach from '../../shared/components/ContactCoach/ContactCoach';
import Reservation from '../../shared/components/Reservation/Reservation';
import Inscription from '../../shared/components/Inscription/Inscription';
import Login from '../../shared/components/Login/Login';
import ReservationCours from '../../shared/components/ReservationCours/ReservationCours';



const localizer = momentLocalizer(moment);
const propTypes = {}
const myEventsList = [
  { start: new Date(2021, 2, 2, 6), end: new Date(2021, 2, 2, 20), title: "special event2" }
];
const scheduleCourse = [
  {
    title: "Elite team",
    end: "2022-02-26",
    start: "2020-12-01",
    monday: { start: "06:00", end: "12:00" },
    // thursday: { startTime: "12:00", endTime: "15:00" },
    // saturday: { startTime: "10:00", endTime: "11:00" },
    // sunday: { startTime: "17:00", endTime: "18:00" }

  },
];

export default function calander({ coachesList, jobs, sports, dances, regions }) {
  const router = useRouter();
  const [coachData, setCoachData] = useState()
  const renderCoachProfile = (coachData) => {
    const job = jobs.find(job => job._id == coachData.map(e => e.coachData.job))
    let specialty = ""
    if (job.specialty && job.specialty.type == "sport") {

      specialty = sports.find(sport => sport._id == coachData.map(e => e.coachData.specialty))
    }
    else if (job.specialty && job.specialty.type == "dance") {

      specialty = dances.find(dance => dance._id == coachData.map(e => e.coachData.specialty))
    }
    return <InfoCoach
      coachProfile={coachData}
      key={coachData._id}
      job={job}
      specialty={specialty}
      coachcalander={"coachcalander"}
    />
  }

  useEffect(() => {
    setCoachData(coachesList.filter(coach => coach._id == (router.query.id)))
    // {array4? 
    // setState(array4):""}
  }, [router.query.id])
  const [state, setState] = useState([{}])
  console.log("state", state)

  const now = new Date();
  const date = {
    start: new Date(),
    end: now.setDate(now.getDate() + 100)
  };
  const handleSelect = ({ start, end }) => {
    ((((moment(end).startOf('minute').from(start)).substring(4, 3)) == "a") ?
      selectEvent({ start, end })
      : alert('vous deviez réserver qu\'une heure dans la partie reserver'))
  }
  const result = () => {
    const d = scheduleCourse.map(el => {
      const k = el;
      const daysOfSchedule = Object.keys(k);
      const daysDiiff = moment(date.end).diff(date.start, "days");
      let days = [];
      for (let index = 0; index < daysDiiff; index++) {
        if (
          daysOfSchedule.find(
            el =>
              moment(date.start)
                .add(index, "days")
                .format("dddd")
                .toLowerCase() === el.toLowerCase()
          )
        ) {
          const time =
            k[
            daysOfSchedule.find(
              e =>
                moment(date.start)
                  .add(index, "days")
                  .format("dddd")
                  .toLowerCase() === e.toLowerCase()
            )
            ];

          days = [
            ...days,
            {
              id: Math.random() * 100 * Math.random() * 50,
              title: el.title,
              start: new Date(
                moment(date.start)
                  .add(index, "days")
                  .set({
                    hour: parseInt(time.start.slice(0.2), 10),
                    minute: parseInt(time.end.slice(3, 4), 10)
                  })
              ),
              end: new Date(
                moment(date.start)
                  .add(index, "days")
                  .set({
                    hour: parseInt(time.end.slice(0.2), 10),
                    minute: parseInt(time.start.slice(3, 4), 10)
                  })
              )
            }
          ];
        }
      }

      return days;
    });

    return d;
  };
  let array3 = [];
  var i = 0;
  while (result().length > i) {
    array3 = [result()[0], result()[1]];
    i++;
  }
  let array4 = [...array3[0]]

  console.log("array4", array3)

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleLogin, setIsModalVisibleLogin] = useState(true);
  const [isModalVisibleReservation, setIsModalVisibleReservation] = useState(false)
  const showModal = () => {
    setIsModalVisible(true);

  }
  const showModalLogin = () => {
    setIsModalVisibleLogin(true);

  }
  const showVisibleReservation = () => {
    setIsModalVisibleReservation(true);

  }
  const selectEvent = ({ start, end }) => {

    const title = window.prompt('Merci de saisie votre Nom')
    state.map(el => {
      if (start >= el.start && end <= el.end) {
        if (title)
          setState([
            ...state,
            {
              // id: Math.random() * 100 * Math.random() * 50,
              start,
              end,
              title,
            },
          ]

          )

      }
    })


  }
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="calanderCoach">
        <div className="calanderCoach__coachinfo">
          {coachData ?
            renderCoachProfile(coachData) : ""}
          <div className="coachdetailsinformation">
            <div className={"coach__coachdetails__information"}>

              {coachData ?

                <ContactCoach coachData={coachData} /> : ""}
            </div>
          </div>
        </div>
        <div className="calendar">
          <Button type="primary" onClick={showModal}>
            Open Modal
      </Button>
          <Button type="primary" onClick={showModalLogin}>
            Login
      </Button>
      <Button type="primary" onClick={showVisibleReservation}>
            reservation
      </Button>
            
          <Inscription isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
          <Login isModalVisibleLogin={isModalVisibleLogin} setIsModalVisibleLogin={setIsModalVisibleLogin} />
          <ReservationCours 
              isModalVisibleReservation={isModalVisibleReservation} setIsModalVisibleReservation={setIsModalVisibleReservation}          /> 
          <Calendar
            selectable
            localizer={localizer}
            events={array4}
            defaultView={Views.WEEK}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={handleSelect}
            length={60}
          />
          <div className="reservation">
            <Reservation />
          </div>
        </div>
      </div>
    </>
  );
}
calander.propTypes = propTypes

calander.getInitialProps = async () => {
  const coachesRes = await fetch(API + "users/coaches/all")
  const jobsRes = await fetch(API + "jobs")
  const sportsRes = await fetch(API + "sports")
  const danceRes = await fetch(API + "dances/")
  const regionsRes = await fetch(API + "regions/")
  const jsonCoachesRes = await coachesRes.json()
  const jsonJobsRes = await jobsRes.json()
  const jsonSportsRes = await sportsRes.json()
  const jsonDancesRes = await danceRes.json()
  const jsonRegionsRes = await regionsRes.json()

  return {
    coachesList: jsonCoachesRes,
    jobs: jsonJobsRes,
    sports: jsonSportsRes,
    dances: jsonDancesRes,
    regions: jsonRegionsRes
  }
}
