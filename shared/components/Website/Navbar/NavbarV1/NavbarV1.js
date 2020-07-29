import css from './NavbarV1.scss';
import { isEmpty } from 'lodash';
import Link from 'next/link';



function NavbarV1({ data, logo }) {
    console.log('data.contact.body.logo: ', data.contact.body.logo);

    return (
        <div className={css.navbarV1}>
            <div className={css.navbarV1__container}>
                <div className={css.navbarV1__container__menu}>
                    <a href="#introduction" className={css.navbarV1__container__menu__text}>LE CLUB</a>
                    <a href="#staff" className={css.navbarV1__container__menu__text}>STAFF</a>
                    <a href="#prices" className={css.navbarV1__container__menu__text}>TARIFS</a>
                    <a href="#contact" className={css.navbarV1__container__menu__text}>CONTACT</a>
                </div>
                <div className={css.navbarV1__container__logo}>
                    <img src={logo} alt="" />
                </div>
                <div className={css.navbarV1__container__contact}>
                    <div className={css.navbarV1__container__contact__text}>
                        {data.contact.body.phoneNumber1} {!isEmpty(data.contact.body.phoneNumber1) && "/ " + data.contact.body.phoneNumber1}
                    </div>
                    <Link href="#contact">
                        <a >
                            <button onClick={() => { }} className={css.navbarV1__container__contact__join_button}>
                                <span>
                                    Rejoindre le club
                            </span>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default NavbarV1;