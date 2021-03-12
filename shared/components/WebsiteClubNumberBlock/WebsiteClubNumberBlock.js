import './websiteClubNumberBlock.scss'

export default function WebsiteClubNumberBlock({ className, title, chiffre, img, index }) {

    return (
        <div
            className={`${"club_number_block"} ${index === 0 ? "club_number_block__is_first" : ""}`}
        >
            <div className={"club_number_block__number"}>
                {chiffre}
            </div>
            <div className={"club_number_block__description"}>
                {title}
            </div>
        </div>

    );
}