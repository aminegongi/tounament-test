import  './partnersV1.scss';

import Clublogo from '../../../clublogo/Clublogo'


function PartnersV1({ data }) {


    return (
        <div className={"club_logo_and_title"}>
            <div className={"price"}>
                <div className={"price__title"}>NOS PARTENAIRES</div>
                <div className={"price__ligne"}>_______________</div>
                {/* <div className={"price__subtitle"}>
                    {data.body.description}
                </div> */}
            </div>

            <Clublogo
                images={data.body}
            />
        </div>
    );
}
export default PartnersV1;