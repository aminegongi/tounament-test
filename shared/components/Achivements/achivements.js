import   './Achivements.scss'
// import routes from '../../../utils/routes';
// import Link from 'next/link';
// import { Empty } from 'antd';
// import { isEmpty } from 'lodash';
import moment from 'moment'

import { Timeline  } from 'antd';

 function achivements({key, el,data,title}) {

    return (
        <>
            <div className={"profilplayer__experiencetitle"}>
                        {title}
                   </div>
                 
                    <Timeline className={"timeline"} >
                            {data.map((el,key)=> {
                            return(
                                <Timeline.Item key={key}>

                                    <div className={"playerexperiance"}>
                                        <div className={"playerexperiance__title"}>
                                            <div className={"playerexperiance__title__clubtitle"}>
                                                {el.title}
                                            </div>
                                            <div className={"playerexperiance__title__date"}>
                                            
                                                ({ moment(el.date.from).format('LL')} - Avril 2018) 
                                            </div>
                                        </div>
                                            <div className={"playerexperiance__description"}>
                                                {el.description}
                                            </div>
                                    </div>
                                </Timeline.Item>

                            )
                            
                            })}     
                    </Timeline>
            </>
    );
}
export default achivements;