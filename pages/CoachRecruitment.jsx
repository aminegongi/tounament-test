import React from 'react'
import '../shared/css/coachRecruitment.scss'
import Navbar from '../shared/components/navbar/Navbar'
import affiche from '../public/icon/Banniere.png'
import recruitmentIcon from '../public/icon/recruter.png'

function CoachRecruitment() {
  return (
    <div>
      <Navbar />
      <div className="affiche">
        <img className="affiche__img" src={affiche} alt="" />
      </div>
      <div className="recruitment">
        <div className="recruitment__icontitle">
          <div className="recruitment__icon">
            <img src={recruitmentIcon} alt="recruitmentIcon" />
          </div>
          <div className="recruitment__title">Récruter l'entraineur</div>
        </div>
        <div className="recruitment__message">
          <div className="recruitment__message__title">
            Nous sommes l'equipe de " Isporit "
          </div>
          <div className="recruitment__message__bodyMessage">
            Nous voullons prendre contact avec vous pour fixer un entretien ...
          </div>
        </div>
        <button className="recruitment__submit">Envoyer</button>
      </div>
    </div>
  )
}

export default CoachRecruitment
