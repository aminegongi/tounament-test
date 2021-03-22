import React, { useState } from 'react'
import  './answer.scss'

function Answer() {
    const [msgReponder, setMsgReponder] = useState(false)

    return (
        <>
        {msgReponder == false ?
            <div className={"coachavis__card__description__repondre"} onClick={() => setMsgReponder(true)}>
                <div className={"coachavis__card__description__repondre__iconrepondre"}>
                    <img src="../icon/reponde.png" alt="repondre" />
                </div>
                <div className={"coachavis__card__description__repondre__title"}>
                    Répondre
                </div>
            </div> :
            <div className={"coachavis"}>
                 <img src={"../icon/AvatarCoach.png"} />
                 <input  placeholder="Votre commentaire" type="text " />
            </div>
        }
        </>

    )
}

export default Answer
