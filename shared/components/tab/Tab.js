import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import css from './tab.scss'
import Demo from '../DemoSection/DemoSection';
import { Icon } from 'antd';
import { v4 as uuid } from 'uuid'

export default function Tab({ content, imgone, imgtwo, imgthere, title, title_two, title_three, sub_title, sub_title_two, sub_title_there,
    sub_title_four, sub_title_five, sub_title_six, sub_title_seven, sub_title_eight, sub_title_nine, bgcolor }) {
    const [key, setkey] = useState(1);
    const [backgroundlistone, setbackgroundlistone] = useState(bgcolor);
    const [backgroundlisttwo, setbackgroundlisttwo] = useState('#ffffff');
    const [backgroundlistthere, setbackgroundlistthere] = useState('#ffffff');

    useEffect(() => {
        const interval = setTimeout(() => {
            clearTimeout(interval)

            if ((key === 1) || (backgroundlistone === bgcolor)) {
                setbackgroundlistone('#ffffff')
                setbackgroundlisttwo(bgcolor)
                setkey(2)
            }
            else if ((key === 2) || (backgroundlisttwo === bgcolor)) {
                setbackgroundlistthere(bgcolor)
                setbackgroundlisttwo('#ffffff')
                setkey(3)

            }
            else if ((backgroundlistthere === bgcolor) || (key === 3)) {
                setbackgroundlistthere('#ffffff')
                setbackgroundlistone(bgcolor)
                setkey(1)

            }

        }, 3000);
        return () => clearTimeout(interval);
        console.log('key: ', key);
    }, [key])

    const onStyleChange = (step) => {
        if (step + 1 === 1) {
            return { backgroundColor: backgroundlistone, "&::after": { borderrightcolor: 'red' } }
        }
        if (step + 1 === 2) {
            return { backgroundColor: backgroundlisttwo }
        }
        if (step + 1 === 3) {
            return { backgroundColor: backgroundlistthere }
        }
    }
    const onChangeTab = (step) => {
        if (step + 1 === 1) {
            setkey(1)
            setbackgroundlisttwo('white')
            setbackgroundlistthere('white')
            setbackgroundlistone(bgcolor)
        }
        if (step + 1 === 2) {
            setkey(2)
            setbackgroundlistone('white')
            setbackgroundlistthere('white')
            setbackgroundlisttwo(bgcolor)
        }
        if (step + 1 === 3) {
            setkey(3)
            setbackgroundlistone('white')
            setbackgroundlisttwo('white')
            setbackgroundlistthere(bgcolor)
        }
    }

    const renderClassName = (step) => {
        if (step + 1 === key) {
            return css.buttonone
        }
        return css.buttonx
    }


    return (

        <div className={css.tab}>
            <style jsx>{`
            button:after  {
                border-right-color: ${bgcolor};
          }
		`}</style>
            <div className={css.img}>
                {key === 1 ?
                    <img src={imgone}></img> : (key === 2 ? <img src={imgtwo}></img> : <img src={imgthere}></img>)}
            </div>
            <div className={css.list_iteam}>
                {
                    content.map((el, index) => {
                        return <div key={uuid()} className={renderClassName(index)}>

                            <button onClick={() => onChangeTab(index)}
                                style={onStyleChange(index)}
                            >
                                <div className={css.tabtitle}>
                                    {el.title}
                                </div>
                                <div className={css.subtitle}>
                                    {el.description}
                                </div>
                            </button>

                        </div>
                    })
                }
            </div>
            <div className={css.mobile_mode}>
                {
                    content.map((el, index) => {
                        return <div key={uuid()} className={css.mobile_item}>
                            <Demo
                                title={el.title}
                                description={el.description}
                            />
                        </div>
                    })
                }
            </div>
        </div>
    );
}