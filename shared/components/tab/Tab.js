/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './tab.scss'
import { Icon } from 'antd'
import Demo from '../DemoSection/DemoSection'
// import { v4 as uuid } from 'uuid'

function Tab({ content, imgone, imgtwo, imgthere, bgcolor }) {
  const [key, setkey] = useState(1)
  const [backgroundlistone, setbackgroundlistone] = useState(bgcolor)
  const [backgroundlisttwo, setbackgroundlisttwo] = useState('#ffffff')
  const [backgroundlistthere, setbackgroundlistthere] = useState('#ffffff')

  useEffect(() => {
    const interval = setTimeout(() => {
      clearTimeout(interval)

      if (key === 1 || backgroundlistone === bgcolor) {
        setbackgroundlistone('#ffffff')
        setbackgroundlisttwo(bgcolor)
        setkey(2)
      } else if (key === 2 || backgroundlisttwo === bgcolor) {
        setbackgroundlistthere(bgcolor)
        setbackgroundlisttwo('#ffffff')
        setkey(3)
      } else if (backgroundlistthere === bgcolor || key === 3) {
        setbackgroundlistthere('#ffffff')
        setbackgroundlistone(bgcolor)
        setkey(1)
      }
    }, 3000)
    return () => clearTimeout(interval)
    console.log('key: ', key)
  }, [key])

  const onStyleChange = (step) => {
    if (step + 1 === 1) {
      return {
        backgroundColor: backgroundlistone,
        '&::after': { borderrightcolor: 'red' },
      }
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
      return 'buttonone'
    }
    return 'buttonx'
  }

  return (
    <div className="tab-component">
      <style jsx>{`
        button:after {
          border-right-color: ${bgcolor};
        }
      `}</style>
      <div className="img">
        {key === 1 ? (
          <img alt="image" src={imgone} />
        ) : key === 2 ? (
          <img alt="image" src={imgtwo} />
        ) : (
          <img alt="image" src={imgthere} />
        )}
      </div>
      <div className="list_iteam">
        {content.map((el, index) => {
          return (
            <div className={renderClassName(index)}>
              <button
                onClick={() => onChangeTab(index)}
                style={onStyleChange(index)}
              >
                <div className="tabtitle">{el.title}</div>
                <div className="subtitle">{el.description}</div>
              </button>
            </div>
          )
        })}
      </div>
      <div className="mobile_mode">
        {content.map((el, index) => {
          return (
            <div className="mobile_item">
              <Demo title={el.title} description={el.description} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tab
