/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import './layout.scss'
import Navbar from '../navbar/Navbar'

export default function Layout({ searchBar, setSearchBar, children, coachesList, jobs, sports, dances, regions }) {
  return (
    <div className="layout_container">
      <div className="layout_container__navbar">
        <Navbar
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          coachesList={coachesList}
          jobs={jobs}
          sports={sports}
          dances={dances}
          regions={regions}
        />
      </div>
      <div className="children isporit_max_width">{children}</div>

      <div className="layout_container__footer">
        <Navbar isFooter />
      </div>
    </div>
  )
}
