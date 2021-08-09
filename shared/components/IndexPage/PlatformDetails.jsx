import { Radio } from 'antd'
import React from 'react'

export default function PlatformDetails({ reversed }) {
  return (
    <div className="flex justify-between w-full items-center">
      {reversed && (
        <div className="flex-1 w-full max-w-md flex justify-end">
          <img
            className="rounded-xl"
            style={{
              boxShadow: '-16px -16px 0px 1px rgba(255,135,96,1)',
            }}
            src="https://o7dkx1gd2bwwexip1qwjpplu-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/GettyImages-1152963869.jpg"
            alt=""
          />
        </div>
      )}
      <div className="max-w-md flex-1" style={{ color: '#212121' }}>
        <div className="text-3xl font-bold mb-3  ">
          Built for all type of soccer organization
        </div>
        <div
          className="w-16 border-b-4  border-solid mb-4"
          style={{ borderColor: '#ffc651' }}
        />
        <div className="max-w-2xl font-medium text-lg mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aperiam
          officiis id laudantium a neque pariatur explicabo nam esse similique?
          Ratione fugit illo sapiente perspiciatis, ipsam maxime nulla
          voluptatum quia.
        </div>
        <Radio.Group
          className="flex flex-col  mb-4 index-page__radio-button text-lg "
          size="large"
          options={[
            'Apple',
            'Pear',
            'Orange',
          ]} /* onChange={this.onChange1} value={value1} */
        />
        <button
          type="button"
          className="bg-primary  text-white text-xl py-2.5 rounded-xl px-11"
        >
          Contact us
        </button>
      </div>
      {!reversed && (
        <div className="flex-1 w-full max-w-md flex justify-end">
          <img
            className="rounded-xl"
            style={{
              boxShadow: '16px -16px 0px 1px rgba(255,135,96,1)',
            }}
            src="https://o7dkx1gd2bwwexip1qwjpplu-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/GettyImages-1152963869.jpg"
            alt=""
          />
        </div>
      )}
    </div>
  )
}
