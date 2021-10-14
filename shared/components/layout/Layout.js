/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './layout.scss'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/footer'
import NavbarCoach from '../navbarCoach/NavbarCoach'

export default function Layout({ children, childrenClassName, isMainPage }) {
  return (
    <div className="layout_container">
      <div className="layout_container__navbar">
        {isMainPage ? <Navbar /> : <NavbarCoach />}
      </div>
      <div className={`children ${childrenClassName}`}>{children}</div>

      <div className="layout_container__footer">
        <Footer />
      </div>
    </div>
  )
}
