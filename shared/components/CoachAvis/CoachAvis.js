import React from 'react'
import { Rate } from 'antd';
import css from './coachAvis.scss'

function CoachAvis() {
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
