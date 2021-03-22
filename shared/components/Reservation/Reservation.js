import React from 'react'
import './reservation.scss'
export default function Reservation() {
    return (
        <div>
            <div className="confirmer_reservation">
                <div className="confirmer_reservation__message">Merci de confirmer votre date </div>
                <div className="confirmer_reservation__date">
                    <div className="confirmer_reservation__date__icon"></div>
                    <div className="confirmer_reservation__date__day">Jeudi</div>
                    <div className="confirmer_reservation__date__year">07-10-2021</div>
                    <div className="confirmer_reservation__date__time">12:00</div>
                </div>
                <div className="buttonconfirmer">
                    <span>confirmer</span>
                </div>
            </div>
        </div>
    )
}
