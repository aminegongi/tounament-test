import css from './layout.scss'
import { useState } from 'react'
import Navbar from '../navbar/Navbar';
export default function Layout({ children, loggedIn }) {
  return (
    <div className={css.layout_container}>
      <Navbar />
      <div className={css.children}>
        {children}
      </div>
      <Navbar isFooter />
    </div>
  );
}