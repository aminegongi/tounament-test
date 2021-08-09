/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './layout.scss'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/footer'

export default function Layout({ children, childrenClassName }) {
  return (
    <div className="layout_container">
      <div className="layout_container__navbar">
        <Navbar />
      </div>
      <div className={`children ${childrenClassName}`}>{children}</div>

      <div className="layout_container__footer">
        <Footer />
      </div>
    </div>
  )
}
