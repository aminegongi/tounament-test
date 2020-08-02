import css from './price.scss'

export default function price({ title, lieu, horaire, price, classname, classnamebutton }) {

    return (
        <div className={css[classname]}>

            <div className={css.partenaire_price_partenaire__price}>
                <div className={css.partenaire_price_partenaire__price__firstpack}>
                    <div className={css.partenaire_price_partenaire__price__firstblock} >
                        <div className={css.partenaire_price_partenaire__price__firstpack__title}>
                            {title}
                        </div>
                        {/* <div className={css.partenaire_price_partenaire__price__firstpack__ligne}>
                            __________________________
                        </div> */}
                    </div>
                    <div className={css.partenaire_price_partenaire__price__firstpack__lieu}>
                        <div>Lieu :</div>
                        <div>{lieu}</div>
                    </div>

                    <div className={css.partenaire_price_partenaire__price__firstpack__horaire}>
                        <div>Horaire :</div>
                        <div>{horaire.map((el, key) => {
                            return <div>{el}</div>
                        })
                        }
                        </div>
                    </div>

                    <div className={css.partenaire_price_partenaire__price__firstpack__price}>
                        {price} DT
                    </div>
                    <button onClick={() => window.location.href = "/contact-us"} className={css[classnamebutton]}>
                        <span>S'inscrire</span>
                    </button>
                </div>
            </div>
        </div>
    );
}