
import  './contactV1.scss';
import { isEmpty } from 'lodash';



function ContactV1({ data }) {


    return (
        <div className={"contact"}>
            <div className={"contact__titlesubtitle"}>
                <div className={"contact__titlesubtitle__title"}>
                    NOUS CONTACTER
                </div>
                <div className={"contact__titlesubtitle__ligne"}>
                    ____________________
                </div>
                <div className={"contact__titlesubtitle__subtitle"}>
                    {data.body.description}

                </div>
            </div>
            <div className={"contact__contact_detais"}>
                <div className={"contact__contact_detais__formulaire"}>
                    <div className={"contact__contact_detais__formulaire__emailtext"}> Email</div>
                    <input type="text" className={"contact__contact_detais__formulaire__email"} placeholder="flenbenfoulen@gmail.com" />
                    <div className={"contact__contact_detais__formulaire__nametext"}> Nom complet</div>
                    <input type="text" className={"contact__contact_detais__formulaire__name"} placeholder="Flen ben foulen" />
                    <div className={"contact__contact_detais__formulaire__sujettext"}> Sujet</div>
                    <input type="text" className={"contact__contact_detais__formulaire__sujet"} placeholder="ex. demande d'informations" />
                    <div className={"contact__contact_detais__formulaire__msgtext"}> Message</div>
                    <textarea className={"contact__contact_detais__formulaire__msg"} rows="7" cols="35">
                    </textarea>
                    <div className={"contact__contact_detais__formulaire__envoyer"}>
                        <button onClick={() => window.location.href = "/contact-us"}
                            className={"contact__contact_detais___formulaire__envoyer"}>
                            Envoyer
                        </button>
                    </div>
                </div>

                <div className={"contact__contact_detais__numeromap"}>
                    <div className={"contact__contact_detais__numeromap__adresse"}>
                        <div className={"contact__contact_detais__numeromap__adresse__icon"}>
                            <img src={"../icon/mapicon.svg"} alt="mapicon"></img>

                        </div>
                        <div className={"contact__contact_detais__numeromap__adresse__ligne"}>

                        </div>
                        <div className={"contact__contact_detais__numeromap__adresse__adressetext"}>
                            <div>
                                <div> {data.body.address}</div>
                                <div >{data.body.city} {!isEmpty(data.body.country) && "+ " + data.body.country}</div>

                            </div>
                        </div>
                    </div>
                    <div className={"contact__contact_detais__numeromap__numero"}>
                        <div className={"contact__contact_detais__numeromap__numero__icon"}>
                            <img src={"../icon/phoneicon.svg"} alt="phoneicon"></img>
                        </div>
                        <div className={"contact__contact_detais__numeromap__numero__ligne"}>

                        </div>
                        <div className={"contact__contact_detais__numeromap__numero__numerotext"}>
                            <div> {data.body.phoneNumber1}</div>
                            <div >{data.body.phoneNumber1}</div>

                        </div>
                    </div>

                    <div className={"contact__contact_detais__numeromap__numero"}>
                        <div className={"contact__contact_detais__numeromap__numero__icon"}>
                            {/* <img src={phoneicon} alt="phoneicon"></img> */}
                            <span> Social Media</span>
                        </div>
                        <div className={"contact__contact_detais__numeromap__numero__ligne"}>

                        </div>
                        <div className={"contact__contact_detais__numeromap__numero__numerotext"}>
                            <div>

                                <a href={data.body.facebook} target="_blank">
                                    <img className={"fb"} src={"../icon/facebook.svg"}  alt="fb" />
                                </a>
                                <a href={data.body.instagram}>
                                    <img className={"fb"}
                                        src={"../icon/instagram.svg"}
                                        target="_blank" alt="instagram"
                                    />
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactV1