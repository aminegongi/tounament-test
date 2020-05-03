import css from './join.scss'

export default function TitleSection({ buttontwo, classbutton }) {

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
            <button onClick={() => window.location.href = "/contact-us"} className={css.button_commercial}>
              {buttontwo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
