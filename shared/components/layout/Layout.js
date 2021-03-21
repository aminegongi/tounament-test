/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './layout.scss'
import { useState } from 'react'
import Navbar from '../navbar/Navbar'

export default function Layout({ children }) {
  return (
    <div className="layout_container">
      <div className="layout_container__navbar">
        <Navbar />
      </div>
      <div className="children">{children}</div>

      <div className="layout_container__footer">
        <Navbar isFooter />
      </div>
    </div>
  )
}
