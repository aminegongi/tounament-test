import { Radio } from 'antd'
import React from 'react'
import ContactUs from '../shared/components/IndexPage/ContactUs'
import PlatformDetails from '../shared/components/IndexPage/PlatformDetails'
import Layout from '../shared/components/layout/Layout'
import '../shared/css/index.scss'

const Index = () => {
  return (
    <div className="index-page">
      <Layout childrenClassName="bg-white ">
        <div
          style={{
            backgroundImage: 'url(/index-cover.png)',
          }}
          className="bg-cover"
        >
          <div className="max-w-7xl m-auto flex justify-between py-14 px-16 items-center">
            <div className="max-w-lg">
              <div className="text-4xl text-white font-bold  mb-4">
                Take your team and players to the next level
              </div>
              <div
                className="w-16 border-b-4 border-solid mb-6"
                style={{ borderColor: '#ffc651' }}
              />
              <div className="text-xl text-white font-bold">
                We use videos and analytics to elevate teams and players
                performance
              </div>
            </div>
            <div
              style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}
              className="z-10 ml-10 max-w-sm pt-10 pb-16 px-9  rounded-xl relative"
            >
              {/* <div className="absolute top-0 left-0 w-full h-full  bg-gray-700" /> */}
              <div className="text-3xl  text-white text-center font-bold mb-4">
                Try 15 days <br /> for free
              </div>
              <input
                className="isporit-input rounded-xl mb-5 "
                placeholder="Team name"
                type="text"
              />
              <input
                className="isporit-input rounded-xl mb-5 "
                placeholder="Email"
                type="text"
              />
              <input
                className="isporit-input rounded-xl mb-5 "
                placeholder="phone number"
                type="text"
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
        <div className="my-12 flex max-w-7xl m-auto bg-white ">
          <div className="flex-1  flex flex-col justify-center items-center ">
            <img
              src="/index-coach-player.png"
              alt=""
              className="rounded-xl mb-4 h-60"
            />
            <img src="/index-icons/coach.png" alt="" />
            <div className="text-3xl font-bold " style={{ color: '#212121' }}>
              For teams
            </div>
            <div
              className="max-w-md font-medium text-lg text-justify mb-4"
              style={{ color: '#212121' }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              aperiam officiis id laudantium a neque pariatur explicabo nam esse
              similique? Ratione fugit illo sapiente perspiciatis, ipsam maxime
              nulla voluptatum quia.
            </div>
            <button
              type="button"
              className="bg-primary  text-white text-xl py-2.5 rounded-xl px-8"
            >
              Details
            </button>
          </div>
          <div className="flex-1  flex flex-col justify-center items-center ">
            <img
              src="/index-team.png"
              alt=""
              className="rounded-xl mb-4 h-60"
            />
            <img src="/index-icons/team.png" alt="" />
            <div className="text-3xl font-bold " style={{ color: '#212121' }}>
              For teams
            </div>
            <div
              className="max-w-md font-medium text-lg text-justify mb-4"
              style={{ color: '#212121' }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              aperiam officiis id laudantium a neque pariatur explicabo nam esse
              similique? Ratione fugit illo sapiente perspiciatis, ipsam maxime
              nulla voluptatum quia.
            </div>
            <button
              type="button"
              className="bg-primary  text-white text-xl py-2.5 rounded-xl px-8"
            >
              Details
            </button>
          </div>
        </div>
        <div
          className=" pt-6 pb-12 flex flex-col items-center"
          style={{ background: '#f8f8f8' }}
        >
          <div className="text-3xl font-medium" style={{ color: '#212121' }}>
            The right platform for talent management
          </div>
          <div
            className="w-16 border-b-4 border-solid mt-2 mb-4"
            style={{ borderColor: '#ffc651' }}
          />
          <div
            className="max-w-2xl font-medium text-lg mb-2 text-center"
            style={{ color: '#212121' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            aperiam officiis id laudantium a neque pariatur explicabo nam esse
            similique? Ratione fugit illo sapiente perspiciatis, ipsam maxime
            nulla voluptatum quia.
          </div>
          <button
            type="button"
            className="bg-primary text-white text-xl py-2.5 rounded-xl px-8"
          >
            Request a free demo
          </button>
          <div className="mt-8">image</div>
        </div>
        <div className=" pt-6 pb-12 flex flex-col items-center">
          <div className="text-3xl font-medium" style={{ color: '#212121' }}>
            The right platform for talent management
          </div>
          <div
            className="w-16 border-b-4 border-solid mt-2 mb-4"
            style={{ borderColor: '#ffc651' }}
          />
          <div
            className="max-w-2xl font-medium text-lg mb-2 text-center"
            style={{ color: '#212121' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            aperiam officiis id laudantium a neque pariatur explicabo nam esse
            similique? Ratione fugit illo sapiente perspiciatis, ipsam maxime
            nulla voluptatum quia.
          </div>

          <div className="flex justify-between w-full max-w-2xl mt-3">
            <div
              style={{ color: '#ff8760' }}
              className="  font-bold text-center"
            >
              <div className="text-3xl mb-1">+20</div>
              <div className="text-xl ">Tags</div>
            </div>
            <div
              style={{ color: '#ff8760' }}
              className="  font-bold text-center"
            >
              <div className="text-3xl mb-1">+5</div>
              <div className="text-xl ">Reports</div>
            </div>
            <div
              style={{ color: '#ff8760' }}
              className="  font-bold text-center"
            >
              <div className="text-3xl mb-1">+20</div>
              <div className="text-xl ">Tags</div>
            </div>
          </div>
        </div>
        <div className=" " style={{ background: '#f8f8f8' }}>
          <div className="py-11 m-auto max-w-7xl px-20">
            <div className="mb-24">
              <PlatformDetails />
            </div>
            <div className="mb-24">
              <PlatformDetails reversed />
            </div>
            <div className="mb-24">
              <PlatformDetails />
            </div>
          </div>
        </div>
        <div className="m-auto max-w-7xl">
          <ContactUs />
        </div>
      </Layout>
    </div>
  )
}

export default Index
