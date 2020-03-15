import css from './layout.scss'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/footer';
import {useState} from 'react'
export default function Layout({children, loggedIn}) {
  const [isNabVisible , setNavIsVisible] = useState(false)
    return (
      <div className={css.layout_container}>
        <Navbar isNabVisible={isNabVisible} setNavIsVisible={setNavIsVisible} loggedIn={loggedIn}/>
        <div onClick={() => setNavIsVisible(false)}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }