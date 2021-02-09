import player from '../../../../../public/icon/subforplayer.svg'
import { useState, useEffect, useRef } from 'react';
import css from './priceV1.scss';
import Price from '../../../Price/Price'

import coach from '../../../../../public/icon/subforcoach.svg'
import routes from '../../../../../utils/routes';
import Link from 'next/link';
import Clublogo from '../../../clublogo/Clublogo'
import { isEmpty } from 'lodash';


function PriceV1({ data, mapicon, phoneicon, instagram, fb }) {

    return (
        <div className={css.partenaire_price}>
            <div className={css.price}>
                <div className={css.price__title}>NOS TARIFS</div>
                <div className={css.price__ligne}>_______________</div>
                {/* <div className={css.price__subtitle}>
                    {data.body.description}
                </div> */}
            </div>
            <div className={css.partenaire_price_partenaire}>
                {data.body.map((el, key) => {

                    //   return Object.keys(el.schedule).map(key => (

                    if (!isEmpty(el.title)) {
                        return <Price
                            classnamebutton="partenaire_price_partenaire__price__blocktwo__buttoninscrire"
                            classname="partenaire_price_partenaire__price__blockone"
                            title={el.title} lieu={el.location}
                            horaire={el.schedule}
                            price={el.price}
                        />
                    }
                    //   ))
                })}
            </div>
        </div>
    )
}

export default PriceV1;