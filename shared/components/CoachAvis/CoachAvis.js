import React, { useState } from 'react'
import { Rate, Input } from 'antd';
import css from './coachAvis.scss'

function CoachAvis() {
    const [msgReponder, setMsgReponder] = useState(false)
    return (
        <div className={css.coachavis}>
            <div className={css.coachavis__sumavis}>
                <span>les 26 avis de Amira</span> <Rate disabled defaultValue={2} />
                <div className={css.coachavis__sumavis__chiffre}> 3.5 /5</div>
            </div>
            <div className={css.coachavis__card}>
                <div className={css.coachavis__card__description}>
                    <div className={css.coachavis__card__description__recommendationMember}>
                        <img src="../icon/AvatarCoach.png" className={css.coachavis__card__description__recommendationMember__avatar} alt="" />
                        <div className={css.coachavis__card__description__recommendationMember__nameStart}>
                            <div className={css.coachavis__card__description__recommendationMember__nameStart__name}>
                                Nour jbeli
                            </div>
                            <div className={css.coachavis__card__description__recommendationMember__nameStart__start}>
                                <Rate disabled defaultValue={2} />
                            </div>
                        </div>
                        <div className={css.coachavis__card__description__recommendationMember__publishdate}>
                            il y a  3 jours
                            </div>
                    </div>
                    <div className={css.coachavis__card__description__avis}>
                        Résultat de recherche d'images pour
                        description d'un coach sportif" Résultat
                        de recherche d'images pour "description
                        d'un coach sportif"
                    </div>
                    {msgReponder == false ?
                        <div className={css.coachavis__card__description__repondre} onClick={() => setMsgReponder(true)}>
                            <div className={css.coachavis__card__description__repondre__iconrepondre}>
                                <img src="../icon/reponde.png" alt="repondre" />
                            </div>
                            <div className={css.coachavis__card__description__repondre__title}>
                                Répondre
                        </div>
                        </div> :
                        <textarea className={css.textarea} name="w3review" rows="2" cols="44" />
                    }
                </div>


                <div className={css.coachavis__card__description}>
                    <div className={css.coachavis__card__description__recommendationMember}>
                        <img src="../icon/AvatarCoach.png" className={css.coachavis__card__description__recommendationMember__avatar} alt="" />
                        <div className={css.coachavis__card__description__recommendationMember__nameStart}>
                            <div className={css.coachavis__card__description__recommendationMember__nameStart__name}>
                                Nour jbeli
                            </div>
                            <div className={css.coachavis__card__description__recommendationMember__nameStart__start}>
                                <Rate disabled defaultValue={2} />
                            </div>
                        </div>
                        <div className={css.coachavis__card__description__recommendationMember__publishdate}>
                            il y a  3 jours
                        </div>
                    </div>
                    <div className={css.coachavis__card__description__avis}>
                        Résultat de recherche d'images pour
                        description d'un coach sportif" Résultat
                        de recherche d'images pour "description
                        d'un coach sportif"
                    </div>

                    <div className={css.coachavis__card__description__avismember}>
                        <div className={css.coachavis__card__description__avismember__avatarrepondre}>
                            <img src="../icon/Avatar.png" alt="Avatar" />
                        </div>
                        <div className={css.coachavis__card__description__avismember__memberinfo}>
                            <div className={css.coachavis__card__description__avismember__memberinfo__nameDate}>
                                <div className={css.coachavis__card__description__avismember__memberinfo__nameDate__name}>
                                    Yassine
                                </div>
                                <div className={css.coachavis__card__description__avismember__memberinfo__nameDate__date}>
                                    il y a  3 jours
                                </div>
                            </div>
                            <div div className={css.coachavis__card__description__avismember__memberinfo__contenu}>
                                Merci pour votre recommandations.
                            </div>
                        </div>
                    </div>
                </div>

                <div className={css.coachavis__card__description}>
                    <div className={css.coachavis__card__description__recommendationMember}>
                        <img src="../icon/AvatarCoach.png" className={css.coachavis__card__description__recommendationMember__avatar} alt="" />
                        <div className={css.coachavis__card__description__recommendationMember__nameStart}>
                            <div className={css.coachavis__card__description__recommendationMember__nameStart__name}>
                                Nour jbeli
                            </div>
                            <div className={css.coachavis__card__description__recommendationMember__nameStart__start}>
                                <Rate disabled defaultValue={2} />
                            </div>
                        </div>
                        <div className={css.coachavis__card__description__recommendationMember__publishdate}>
                            il y a  3 jours
                            </div>
                    </div>
                    <div className={css.coachavis__card__description__avis}>
                        Résultat de recherche d'images pour
                        description d'un coach sportif" Résultat
                        de recherche d'images pour "description
                        d'un coach sportif"
                    </div>
                </div>

                <div className={css.coachavis__card__description}>
                    <div className={css.coachavis__card__description__recommendationMember}>
                        <img src="../icon/AvatarCoach.png" className={css.coachavis__card__description__recommendationMember__avatar} alt="" />
                        <div className={css.coachavis__card__description__recommendationMember__nameStart}>
                            <div className={css.coachavis__card__description__recommendationMember__nameStart__name}>
                                Nour jbeli
                            </div>
                            <div className={css.coachavis__card__description__recommendationMember__nameStart__start}>
                                <Rate disabled defaultValue={2} />
                            </div>
                        </div>
                        <div className={css.coachavis__card__description__recommendationMember__publishdate}>
                            il y a  3 jours
                            </div>
                    </div>
                    <div className={css.coachavis__card__description__avis}>
                        Résultat de recherche d'images pour
                        description d'un coach sportif" Résultat
                        de recherche d'images pour "description
                        d'un coach sportif"
                    </div>
                </div>



            </div>
        </div>
    )
}

export default CoachAvis
