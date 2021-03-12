import   './layout.scss'
import { useState } from 'react'
import Navbar from '../navbar/Navbar';
export default function Layout({ children, loggedIn }) {
  return (
    <div className={"layout_container"}>
      <Navbar />
      <div className={"children"}>
        {children}
      </div>
      <Navbar isFooter />
    </div>
  );
}