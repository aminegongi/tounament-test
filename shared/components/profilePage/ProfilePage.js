import globalCss from '../../global-style.scss'
import css from './profile-page.scss'
import ExperienceItem from '../experienceItem'
export default function ({ router }) {
    return <div className={css.profile_page_container}>
        <div className={css.profile_information}>
            <div className={css.left_side}>
                <h1 className={css.title}>{router.query.id}</h1>
                <p className={css.email}>contact@gammarthsport.com</p>
                <div className={css.tags}>Tennis</div>
                <div className={css.tags}>Ball</div>
                <div className={css.tags}>Courts</div>
                <div className={css.information}>
                    <span className={css.label}>Club : </span>
                    <span className={css.information_description}>Gammarth Sport Center</span>
                </div>
                <div className={css.information}>
                    <span className={css.label}>Numero : </span>
                    <span className={css.information_description}>(+216) 28 123 456</span>
                </div>
                <div className={css.information}>
                    <span className={css.label}>Adresse : </span>
                    <span className={css.information_description}>Résidence le Golfe, Gammarth, Tunis.</span>
                </div>

                <div className={css.social_media}>
                    <img src='/facebook.svg' alt='facebook' />
                </div>
                <div className={css.social_media2}>
                    <img src='/googleLogo.svg' alt='facebook' />
                </div>

            </div>
            <div className={css.right_side}>
                <img src="https://scontent.ftun12-1.fna.fbcdn.net/v/t1.0-9/28279364_1571701242907062_4835696600676195742_n.jpg?_nc_cat=110&_nc_oc=AQn6iCOZOW2TnT6GHEzJ7nU0x5G19rK_-AbuGDd_0T1IEIo9pQZh9WKRb1RQF4YMU_0&_nc_ht=scontent.ftun12-1.fna&oh=3ab01deda0cfa6e31110d1fd74daf0fe&oe=5E231F4E" alt='achour mohamed' />
            </div>
        </div>
        <section className={css.experience_section}>
            <hr />
            <div className={css.content}>
                <ExperienceItem
                    content={"lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset."}
                    title="Hammam Lif Center "
                    date="Mai 2017-Avril 2018"
                />
                <ExperienceItem
                    content={"lorem Ipsum dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lo dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset."}
                    title="Gammarth Sport Center"
                    date="Mai 2017-Avril 2018"
                />
                <ExperienceItem
                    content={"lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset abim dolor aset lorem Ipsum dolor aset."}
                    title="Hammam Lif Center "
                    date="Mai 2017-Avril 2018"
                />
                
            </div>
        </section>
    </div>
}