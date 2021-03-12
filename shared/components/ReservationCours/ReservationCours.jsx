import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import './reservationCours.scss'
const ReservationCours = ({ isModalVisibleReservation, setIsModalVisibleReservation }) => {



    const handleOk = () => {
        setIsModalVisibleReservation(false);
    };

    const handleCancel = () => {
        setIsModalVisibleReservation(false);
    };

    return (
        
        <div >
            <Modal footer={null} className="reservation" visible={isModalVisibleReservation} onOk={handleOk} onCancel={handleCancel}>
               
               <div className="reservation__block">
                    <div className="reservation__title">
                    Réserver vos cours
                </div>

             
                <button className="reservation__button_inscription">
                    <span>Disponibilités</span>
                </button>
                <div className="reservation__title">
                Récruter l'entraineur 
                </div>

             
                <button className="reservation__button_contact">
                    <span>Prise de contact</span>
                </button>
                </div>
            </Modal>
        </div>
    );
};
export default ReservationCours