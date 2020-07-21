import css from './join.scss'
import routes from '../../../utils/routes';
import Link from 'next/link';

export default function TitleSection({ buttontwo, classbutton, link }) {

  return (
    <div className={css.join_container}>

      <div className={css.join}>
        <div className={css.join_community}>
          Rejoignez notre communauté <br />
          et faîtes partie des meilleurs
      </div>
        <div className={css.join_button}>
          {/* <button onClick={() => window.location.href = "/contact-us"} className={css.buttom_connexion}>
          {buttonone}
        </button> */}
          <div className={classbutton}>
            <Link href={link}>
              <button className={css.button_commercial}>
                {buttontwo}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
