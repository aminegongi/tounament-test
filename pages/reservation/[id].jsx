/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'
import moment from 'moment';
import { Icon, Affix, Select, Button, Modal } from 'antd'
import { useMediaPredicate } from 'react-media-hook';
import Layout from '../../shared/components/layout/Layout';
import { addZeroToTime, cutString } from '../../utils/string.utils';
import BookingLocationModal from '../../shared/components/BookingLocationModal';
import AuthContext from '../../utils/context.utils';
import createBookingApi, { deleteBookingApi } from '../../shared/services/booking.service';
import { CLIENT_SIDE_API_BASE_URL, REQUEST_FAILED, REQUEST_SUCCEEDED } from '../../shared/constants';



export default function ClubReservation() {
    const { query: { id } } = useRouter()
    const [locations, setLocations] = useState([])
    const [bookings, setBookings] = useState([])
    const [selectedDate, setSelectedDate] = useState(moment().format())
    const [selectedLocation, setSelectedLocation] = useState("")
    const [isBookingModalVisible, setIsBookingModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log('bookings: ', locations);
    const authContext = useContext(AuthContext)
    const isMobile = useMediaPredicate('(max-width: 992px)')

    useEffect(() => {
        Axios.get(`${CLIENT_SIDE_API_BASE_URL}/locations/${id}`).then(res => {
            setLocations(res.data)
            setSelectedLocation(res.data[0] && res.data[0]._id)
        })
        Axios.get(`${CLIENT_SIDE_API_BASE_URL}/booking/${id}`).then(res => {
            setBookings(res.data)
        })
        if (window) {
            window.scroll({
                top: 700
            })
        }
    }, [])


    const onSave = async ({ startsAt, endsAt }) => {
        if (!authContext.isLoggedIn) {
            return authContext.toggleLogInModal(() => () => alert())
        }


        const bookingResult = await createBookingApi(id, {
            title: `${authContext.userProfile.firstName} ${authContext.userProfile.lastName} ( ${authContext.userProfile.phoneNumber} )`,
            location: selectedLocation,
            startsAt: moment(`${moment(selectedDate).format('YYYY-MM-DD')} ${moment(startsAt, 'HH:mm').format('HH:mm')}`).format(),
            endsAt: moment(`${moment(selectedDate).format('YYYY-MM-DD')} ${moment(endsAt, 'HH:mm').format('HH:mm')}`).format(),
            price: 0,
            isPaid: false,
        }, setLoading)
        if (bookingResult.type === REQUEST_SUCCEEDED) {
            setBookings([...bookings, bookingResult.data])
            setIsBookingModalVisible(false)
        }
        if (bookingResult.type === REQUEST_FAILED) {
            if (bookingResult.data.message === "bookingOutOfWorkingTime") {
                alert('booking out of booking hours')
            }
            if (bookingResult.data.message === "bookingExists") {
                alert('booking exists')
            }
        }


        // Axios.post(`http://localhost:8080/locations/?clubId=${id}`).then(res => {
        //     setLocations(res.data)
        //     setSelectedLocation(res.data[0] && res.data[0]._id)
        // })
    }

    const onDeleteBooking = (currentBooking) => {
        const deleteBooking = async() => {
            const bookingResult = await deleteBookingApi(id, currentBooking, setLoading)
            if (bookingResult.type === REQUEST_SUCCEEDED) {
                setBookings(bookings.filter(el => el._id !== currentBooking._id))
            }
            if (bookingResult.type === REQUEST_FAILED) {
                alert('error')
            }
        }
        Modal.confirm({
            content: `Are you sure you want to delete this booking ${moment(currentBooking.startsAt).format('LLLL')}?`,
            onOk: () => {
                deleteBooking()
            }
        })
    }

    return (
        <div className="">
            <Layout childrenClassName="bg-white " isMainPage>
                <div className=" max-w-5xl m-auto">
                    <Affix offsetTop={isMobile ? 71 : 56}>
                        <Select className="w-full" value={selectedLocation} onChange={e => setSelectedLocation(e)} >
                            {
                                locations.map(location => {
                                    const prices = location.prices.filter(el => el.userTypes.includes('others'))
                                    return (
                                        <Select.Option key={location._id}>
                                            {location.name} <b>{prices.length > 0 && `( ${prices.map(el => `${el.price}DT`).join(' - ')} )`}</b>
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                        <div className="flex justify-between items-center mb-5 px-4 bg-white py-3">
                            {moment().isBefore(moment(selectedDate)) ? <Icon type="left" onClick={() => setSelectedDate(v => moment(v).subtract(1, 'day'))} /> : <div />} 
                            <div className="">{moment(selectedDate).format('LL')}</div>
                            <Icon type="right" onClick={() => setSelectedDate(v => moment(v).add(1, 'day'))} />
                        </div>
                    </Affix>


                    <div className="flex p-3 ">
                        <div className="flex flex-col ">
                            {
                                Array.from({ length: 47 }, () => { }).map((el, index) => {
                                    const minutes = index * 30
                                    const displayHours = Math.floor(minutes / 60)
                                    const displayMinutes = minutes % 60
                                    return (
                                        <div className="h-10 pr-3 leading-none border-b border-solid border-gray-200">
                                            {`${addZeroToTime(displayHours)}:${addZeroToTime(displayMinutes)}`}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full">
                            {
                                Array.from({ length: 47 }, () => { }).map((_, index) => {
                                    const minutes = index * 30
                                    const displayHours = Math.floor(minutes / 60)
                                    const displayMinutes = minutes % 60
                                    const currentTime = moment(`${moment(selectedDate).format('YYYY-MM-DD')}${addZeroToTime(displayHours)}:${addZeroToTime(displayMinutes)}`, 'YYYY-MM-DD HH:mm')
                                    const currentBooking = bookings.find(booking => {
                                        return booking.location === selectedLocation && moment(booking.startsAt).set('second', 0).set('milliseconds', 0).isSameOrBefore(currentTime) && moment(booking.endsAt).set('second', 0).set('milliseconds', 0).isAfter(currentTime)
                                    })
                                    return (
                                        <div className={`${currentBooking ? "bg-gray-600" : ''} h-10 w-full ${currentBooking ? '' : 'border-b border-solid border-gray-200'}`} >
                                            {
                                                currentBooking && currentBooking.createdBy === authContext.userProfile._id && (
                                                    <div className="flex justify-between items-center py-1 px-2">
                                                        <div className="text-white">{cutString(currentBooking.title, 15)}</div>
                                                        <Button loading={loading} onClick={() => onDeleteBooking(currentBooking)} className="h-7 my-1" type="danger">
                                                            Annuler
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Affix offsetBottom={0}>
                    <button onClick={() => setIsBookingModalVisible(true)} type="button" className="w-full py-3 bg-primary text-white text-xl" >
                        Reserver
                    </button>
                </Affix>
            </Layout>
            <BookingLocationModal
                locations={locations}
                isVisible={isBookingModalVisible}
                onCancel={() => setIsBookingModalVisible(false)}
                selectedLocation={selectedLocation}
                onChangeLocation={e => setSelectedLocation(e)}
                onSave={onSave}
            />
        </div>
    )
}