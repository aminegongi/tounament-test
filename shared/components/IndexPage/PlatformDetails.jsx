import { Radio } from 'antd'
import React from 'react'

export default function PlatformDetails({
  title,
  description,
  children,
  image,
  reversed,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full items-center">
      {reversed && (
        <div className="flex-1 w-full max-w-md flex justify-end">
          <img
            className="rounded-xl"
            style={{
              boxShadow: '-16px -16px 0px 1px rgba(255,135,96,1)',
            }}
            src={image}
            alt="demo"
          />
        </div>
      )}
      <div
        className={`max-w-md flex-1 ${!reversed && 'mb-10'} md:mb-0`}
        style={{ color: '#212121' }}
      >
        <div className="text-2xl md:text-3xl font-bold mb-3  ">{title}</div>
        <div
          className="w-16 border-b-4  border-solid mb-4"
          style={{ borderColor: '#ffc651' }}
        />
        <div className="max-w-2xl font-medium text-base md:text-lg mb-2">
          {description}
        </div>
        {children}
      </div>
      {!reversed && (
        <div className="flex-1 w-full max-w-md flex justify-end">
          <img
            className="rounded-xl"
            style={{
              boxShadow: '16px -16px 0px 1px rgba(255,135,96,1)',
            }}
            src={image}
            alt=""
          />
        </div>
      )}
    </div>
  )
}
