import React ,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import css from './tab.scss'
import {  Icon } from 'antd';

export default function Tab({ imgone,imgtwo,imgthere,title,title_two,title_three, sub_title,sub_title_two,sub_title_there,
    sub_title_four,sub_title_five,sub_title_six,sub_title_seven,sub_title_eight,sub_title_nine,bgcolor }) {
    const [key, setkey] = useState(1);
    const [backgroundlistone, setbackgroundlistone] = useState(bgcolor);
    const [backgroundlisttwo, setbackgroundlisttwo] = useState('#ffffff');
    const [backgroundlistthere, setbackgroundlistthere] = useState('#ffffff');
    const interval= setTimeout(() => {
        if( (key===1) || (backgroundlistone===bgcolor) ) {
            setbackgroundlistone('#ffffff')
            setbackgroundlisttwo(bgcolor)
            setkey(2)
            console.log('backgroundlisttwo',backgroundlisttwo)
        }
        else if ((key===2) || (backgroundlisttwo===bgcolor)  ) {
            setbackgroundlistthere(bgcolor)
            setbackgroundlisttwo('#ffffff')
            setkey(3)

        }
        else if((backgroundlistthere===bgcolor) || (key===3)  ) {
            setbackgroundlistthere('#ffffff')
            setbackgroundlistone(bgcolor)
            setkey(1)

        }
        
      }, 3000);
      useEffect(() => {
        clearTimeout(interval)
      }, [ ])
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
                setbackgroundlistone(bgcolor)}}
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
                            setbackgroundlisttwo(bgcolor)}
                        }
             style={{ backgroundColor: backgroundlisttwo }}>
                 
                 
                 <div className={css.tabtitle}> {title_two} </div>
             <div className={css.subtitle}>
             <div>{sub_title_four} </div>
             <div>    {sub_title_five}</div>
             <div>{sub_title_six}</div>
             </div></button>

            <button className="iteamthere" onClick={()=>{setkey(3),
            setbackgroundlistone('white'),
            setbackgroundlisttwo('white'),setbackgroundlistthere(bgcolor)}}
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