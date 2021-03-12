import  './Functionclub.scss'

export default function Functionclub({ className, title, description, img }) {

    return (
        <div className={"className"}>
            <div className={"system"}>

                <img className={"system_img"} src={img} alt={title} />
                <div className={"gestion_club_title"}>
                    {title}
                </div>
                <div className={"gestion_club_text"}>
                    {description}
                </div>
            </div>
        </div>
    );
}