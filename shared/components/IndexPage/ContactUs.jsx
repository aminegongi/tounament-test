import React from 'react'

export default function ContactUs(params) {
  return (
    <div className="py-10 w-full flex flex-col items-center">
      <div
        className="max-w-md text-3xl font-bold text-center "
        style={{
          color: '#212121',
        }}
      >
        Take your team to the next level with isporit
      </div>
      <div className="text-3xl font-bold mt-14" style={{ color: '#2a2a2a' }}>
        Contact us
      </div>
      <div
        className="w-16 border-b-4  border-solid mt-2"
        style={{ borderColor: '#ffc651' }}
      />
      <div className="py-10 px-28  w-full">
        <div className="py-12 px-40" style={{ background: '#f8f8f8' }}>
          <input
            className="w-full py-3 px-7 text-base rounded-xl border-none mb-4 "
            type="text"
            placeholder="Full name"
          />
          <input
            className="w-full py-3 px-7 text-base rounded-xl border-none mb-4 "
            type="text"
            placeholder="Full name"
          />
          <input
            className="w-full py-3 px-7 text-base rounded-xl border-none mb-4 "
            type="text"
            placeholder="Full name"
          />

          <button
            className="w-full bg-primary  text-white text-xl py-2 rounded-xl"
            type="submit"
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  )
}
