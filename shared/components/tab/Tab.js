import React ,{useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import css from './tab.scss'
export default function Tab({ imgone,imgtwo,imgthere,title,title_two,title_three, sub_title,sub_title_two,sub_title_there,
    sub_title_four,sub_title_five,sub_title_six,sub_title_seven,sub_title_eight,sub_title_nine }) {
    const [key, setkey] = useState(1);
    const [backgroundlistone, setbackgroundlistone] = useState('#e3f7f6');
    const [backgroundlisttwo, setbackgroundlisttwo] = useState('#ffffff');
    const [backgroundlistthere, setbackgroundlistthere] = useState('#ffffff');


return(
    <div className={css.tab}>

        <div className={css.img}>
            {key===1?
            <img src={imgone}></img> :( key===2 ?  <img src={imgtwo}></img>  : <img src={imgthere}></img> ) }
        </div>
        <div className={css.list_iteam}>
                <button className="iteamone" 
                onClick={()=>{setkey(1),
                                            setbackgroundlisttwo('white'),
                                            setbackgroundlistthere('white'),
                                            setbackgroundlistone('#e3f7f6')}}
                 style={{ backgroundColor: backgroundlistone }} >
                <div className={css.tabtitle}> {title} </div>
                <div className={css.subtitle}>
                <div>{sub_title} </div>
                <div>{sub_title_two}</div>
                <div>{sub_title_there}</div>
                </div>
            </button>
            <button className="iteamtwo" 
            onClick={()=>{setkey(2),
                            setbackgroundlistone('white'),
                            setbackgroundlistthere('white'),
                            setbackgroundlisttwo('#e3f7f6')}
                        }
             style={{ backgroundColor: backgroundlisttwo }}><div className={css.tabtitle}> {title_two} </div>
             <div className={css.subtitle}>
             <div>{sub_title_four} </div>
             <div>    {sub_title_five}</div>
             <div>{sub_title_six}</div>
             </div></button>

            <button className="iteamthere" onClick={()=>{setkey(3),
            setbackgroundlistone('white'),
            setbackgroundlisttwo('white'),setbackgroundlistthere('#e3f7f6')}}
             style={{ backgroundColor: backgroundlistthere }}><div className={css.tabtitle}> {title_three} </div>
             <div className={css.subtitle}>
             <div>{sub_title_seven} </div>
             <div>    {sub_title_eight}</div>
             <div>{sub_title_nine}</div>
             </div></button>

            
        </div>
  </div>
);
}