import React,{useState} from 'react'
import css from './experience.scss'
import { Slider } from 'antd';

export default function experience({setdatacopy,data,datacopy}) {
  const [marksvalue, setmarksvalue] = useState('')
    const marks = {
        0: '0',
        5: '5',
        25: {
          style: {
            color: '#000000',
            fontsize: '14px',
            lineheight: '1.21',
          },
          label: <strong>25ans</strong>,
        },
      };

     const onChange = value => {
        setmarksvalue(
          value
        );
      //   data.filter(e => e.map((el)=>{
      //    ( e.coachData.experiencesYearsNumber == marksvalue.value ? 
      //     (console.log("coachData.experiencesYearsNumber",e.coachData.lookingForJob )) :
      //      (console.log("false",e.coachData.lookingForJob)) }));
      //     //  console.log("marksvalue",marksvalue)
      // };
        }
      // setdatacopy(data.filter(e => e.firstName.includes(value)))

      const onSearchbyexperience = value =>  {
        // setdatacopy(data.filter(e => e.coachData.experiencesYearsNumber.includes(value)))
   };
    return (
        <div className={css.experience}> 
          <div className={css.experience__title} >NOMBRE D'EXPÉRIENCE
{          console.log("tt",data)
}          </div>
          <div className={css.experience__marks}> 
              <Slider styele={{backgroudColor:'red'}} class={css.experience__marks__line}
                 onChange={onChange}
                 marks={marks} max={25}/>
           </div>
        </div>
    )
}
