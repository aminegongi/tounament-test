import React from 'react'
import Head from 'next/head'
import Layout from '../shared/components/layout/Layout'
import '../shared/css/club.scss'

import Clublogo from '../shared/components/clublogo/Clublogo'

import Title from '../shared/components/TitleSection/TitleSection'
import Demo from '../shared/components/DemoSection/DemoSection'
import Postplatforme from '../shared/components/postplatforme/Postplatforme'
import Tab from '../shared/components/tab/Tab'
import Join from '../shared/components/joinplatforme/Join'
import '../shared/global-style.scss'

import routes from '../utils/routes'
import { FB_PIXEL_ID } from '../shared/constants'
import FacebookPixel from '../shared/components/FacebookPixel'

const Index = () => {
  // const [lang, setLang] = useState(undefined)
  // useEffect(() => {
  //   setLang(i18n.language)
  // }, [i18n.language])

  return (
    <div className="club_page">
      <Head>
        <title>{process.env.NODE_ENV}</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="vous pouvez digitaliser votre travail (site web, gestion, suivi, calendrier, performances ...) 
                        dans une seule plateforme. Vous pouvez personnaliser votre site Web avec vos propres informations 
                        afin que les intéressés puissent vous contacter directement depuis votre site Web."
        />
        <meta
          name="keywords"
          content="sport,clubs,coaches,players,tennis,football..."
        />
        <meta name="author" content="iSporit" />
        <FacebookPixel />
      </Head>
      <Layout>
        <div className="postplatforme">
          <Postplatforme
            img="icon/for_club.png"
            title="La gestion de votre club n'a jamais été aussi simple"
            sub_title="vous pouvez digitaliser votre travail (site web, gestion, suivi, calendrier, performances ...) 
                        dans une seule plateforme. Vous pouvez personnaliser votre site Web avec vos propres informations 
                        afin que les intéressés puissent vous contacter directement depuis votre site Web."
            // buttonone="Gérer mon équipe gratuitement"
            buttonone="J'inscris mon club"
            backgroundbutton="#26beb5"
            link={routes.SIGN_UP.path}
          />
        </div>
        <div className="iteamlistblock">
          <Clublogo
            images={[
              {
                alt: 'club',
                src: 'clubLogo/radesTennisAcademy.jpg',
              },
              {
                alt: 'club',
                src: 'clubLogo/eliteSportAcademy.jpg',
              },
              {
                alt: 'club',
                src: 'clubLogo/omSchoolTunis.jpg',
              },
            ]}
          />

          <div className={`${'presenter_winner'} ${'isporit_max_width'}`}>
            <div className="presenter_block">
              <div style={{ justifySelf: 'center' }}>
                <Demo
                  img="icon/suivi_club.png"
                  title="Gagnez plus"
                  title_two="de 10h par semaine"
                  description="Notre plateforme offre désormais à vos joueurs et entraîneurs la possibilité de suivre les dernières actualités grâce aux alertes et messages mobiles entre joueurs / entraîneurs / clubs et de communiquer de manière transparente et efficace!"
                  link={routes.CONTACT_US.clubPath}
                />
              </div>
              <img
                style={{ width: '100%' }}
                alt=""
                className="Image_gagnant"
                src="icon/club.svg"
              />
            </div>
          </div>

          <Title
            title="Boostez la gestion de votre club"
            sub_title="Nous vous offrons plusieurs outils intuitifs et faciles à utiliser"
          />
          <div className={`${'isporit_max_width'} ${'tab'} `}>
            <Tab
              bgcolor="#E3F7F6"
              imgone="feature/club/programme.svg"
              imgtwo="feature/club/calendar.svg"
              imgthere="feature/club/siteweb.svg"
              content={[
                {
                  title: 'Gérez des joueurs et des entraîneurs',
                  description:
                    'Suivez les performances de vos joueurs et le travail de vos entraîneurs en quelques clics.',
                },
                {
                  title: 'Gérez des groupes et du calendrier',
                  description:
                    "Vous pouvez facilement suivre toutes les planifications et l'historique de vos groupes ainsi que le planning de vos salles/terrains.",
                },
                {
                  title: 'Personnalisez votre site web',
                  description:
                    'Vous pouvez personnaliser votre site Web avec votre propre logo, images et texte afin que les intéressés puissent vous contacter à partir du site Web.',
                },
              ]}
            />
          </div>

          <div className={`${'isporit_max_width'} ${'join'} `}>
            <Join
              link={routes.CONTACT_US.clubPath}
              buttontwo="Contactez notre service commercial"
              classbutton="buttondisplay"
            />
          </div>
        </div>
      </Layout>
    </div>
  )
}

// Index.getInitialProps = async (ctx) => {

//   return ({
//     namespacesRequired: ['common'],
//   })
// }

Index.propTypes = {
  // t: PropTypes.func.isRequired,
}
// export default withTranslation('common')(Index);
export default Index
