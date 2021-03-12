import { useState, useEffect, useRef } from 'react';
import './staffV1.scss';
import Member from '../../../member/Member'
import { isEmpty } from 'lodash';



function StaffV1({ data }) {

    return (
        <>
            <div className={"staff"}>
                <div className={"staff__title"}>STAFF</div>
                <div className={"staff__ligne"}>_______________</div>
                <div className={"staff__subtitle"}>
                    {data.body.description}
                </div>
            </div>
            <div className={"presentationequipe"}>
                {data.body.members.filter(el => !isEmpty(el.firstName)).map((el, i) => {
                    return (
                        <div className={"staff__member"}>
                            {
                                !isEmpty(el.firstName) && <Member key={Math.round(Math.random() * Math.random() * 100)} firstName={el.firstName} lastName={el.lastName} img={el.image} job={el.job} icon={"../icon/joinfile.svg"} description={el.description} />

                            }
                        </div>
                    )
                })}
            </div>
        </>
    );
}
export default StaffV1;