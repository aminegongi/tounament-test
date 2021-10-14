/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './layout.scss'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/footer'
import NavbarCoach from '../navbarCoach/NavbarCoach'

export default function Layout({ children, childrenClassName, isCoachNav }) {
  return (
    <div className="layout_container">
      <div className="layout_container__navbar">
        {isCoachNav?<NavbarCoach />:<Navbar />}
      </div>
      <div className={`children ${childrenClassName}`}>{children}</div>

      <div className="layout_container__footer">
        <Footer />
      </div>
    </div>
  )
}
