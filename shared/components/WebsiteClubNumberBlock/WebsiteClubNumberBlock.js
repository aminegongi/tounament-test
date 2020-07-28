import css from './websiteClubNumberBlock.scss'

export default function WebsiteClubNumberBlock({ className, title, chiffre, img, index }) {

    return (
        <div
            className={`${css.club_number_block} ${index === 0 ? css.club_number_block__is_first : ""}`}
        >
            <div className={css.club_number_block__number}>
                {chiffre}
            </div>
            <div className={css.club_number_block__description}>
                {title}
            </div>
        </div>

    );
}