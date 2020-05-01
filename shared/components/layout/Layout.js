import css from './layout.scss'
// import Navbar from '../navbar/Navbar'
import Footer from '../footer/footer';
import { useState } from 'react'
import Navbar from '../navbar/Navbar';
export default function Layout({ children, loggedIn }) {
  const [isNabVisible, setNavIsVisible] = useState(false)
  return (
    <div className={css.layout_container}>
      {/* <Navbar isNabVisible={isNabVisible} setNavIsVisible={setNavIsVisible} loggedIn={loggedIn}/> */}
      <Navbar logo={"icon/logoindexpage.png"}
        navmenu1="La plateforme"
        icon="down"
        navmenu2="Clubs partenaires"
        navmenu3="Chercher un joueur"
        navmenu4="Contact"
        buttonone="connexion"
        buttontwo="S'inscrire gratuitement"
      />
      <div onClick={() => setNavIsVisible(false)}>
        {children}
      </div>
      <Footer />
    </div>
  );
}