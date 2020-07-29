import css from './DetailsV1.scss';
import ClubNumberBlock from '../../../WebsiteClubNumberBlock/WebsiteClubNumberBlock'


function DetailsV1({ data }) {
    return (
        <div className={css.detailsV1}>
            <div className={css.detailsV1__description}>
                <span className={css.detailsV1__description__first_letter}>
                    {data.body.description.slice(0, 1)}
                </span>
                {data.body.description.slice(1)}
            </div>
            <div className={css.detailsV1__ligne}></div>
            <div className={css.detailsV1__club_numbers}>
                <div className={css.detailsV1__club_numbers__label}>
                    Nos chiffres
                </div>
                <div className={css.detailsV1__club_numbers__details}>
                    {data.body.achievements.map((el, index) => {
                        return (
                            <ClubNumberBlock
                                key={index}
                                title={el.title}
                                chiffre={el.number}
                                index={index}
                            />
                        )
                    })}
                </div>
            </div>
        </div>

    );
}
export default DetailsV1;