import { useState, useEffect, useRef } from 'react';
import css from './StaffV1.scss';
import Member from '../../../member/Member'
import { isEmpty } from 'lodash';



function StaffV1({ data }) {

    return (
        <>
            <div className={css.staff}>
                <div className={css.staff__title}>STAFF</div>
                <div className={css.staff__ligne}>_______________</div>
                <div className={css.staff__subtitle}>
                    {data.body.description}
                </div>
            </div>
            <div className={css.presentationequipe}>
                {data.body.members.filter(el => !isEmpty(el.firstName)).map((el, i) => {
                    return (
                        <div className="">
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