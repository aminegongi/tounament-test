import css from './Achivements.scss'
// import routes from '../../../utils/routes';
// import Link from 'next/link';
// import { Empty } from 'antd';
// import { isEmpty } from 'lodash';
import moment from 'moment'

import { Timeline  } from 'antd';

 function achivements({key, el,data,title}) {

    return (
        <>
            <div className={css.profilplayer__experiencetitle}>
                        {title}
                   </div>
                 
                    <Timeline className={css.timeline} >
                            {data.map((el,key)=> {
                            return(
                                <Timeline.Item key={key}>

                                    <div className={css.playerexperiance}>
                                        <div className={css.playerexperiance__title}>
                                            <div className={css.playerexperiance__title__clubtitle}>
                                                {el.title}
                                            </div>
                                            <div className={css.playerexperiance__title__date}>
                                            
                                                ({ moment(el.date.from).format('LL')} - Avril 2018) 
                                            </div>
                                        </div>
                                            <div className={css.playerexperiance__description}>
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