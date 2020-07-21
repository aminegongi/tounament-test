import player from '../../../public/icon/subforplayer.svg'
import { useState, useEffect,useRef } from 'react';
import css from './contactV1.scss';

import coach from '../../../public/icon/subforcoach.svg'
import routes from '../../../utils/routes';
import Link from 'next/link';
import Clublogo from '../clublogo/Clublogo'


function ContactV1({ data,mapicon,phoneicon,instagram,fb}) {
   
     
 return (
<div className={css.contact}>
                <div className={css.contact__titlesubtitle}>
                    <div className={css.contact__titlesubtitle__title}>
                      NOUS CONTACTER
                </div>
                    <div className={css.contact__titlesubtitle__ligne}>
                        ____________________
                </div>
                    <div className={css.contact__titlesubtitle__subtitle}>
                        {data.website.contact.body.description}
                      
                  </div>
                </div>
                <div className={css.contact__contact_detais}>
                    <div className={css.contact__contact_detais__formulaire}>
                        <div className={css.contact__contact_detais__formulaire__emailtext}> Email</div>
                        <input type="text" className={css.contact__contact_detais__formulaire__email} placeholder="flenbenfoulen@gmail.com" />
                        <div className={css.contact__contact_detais__formulaire__nametext}> Nom complet</div>
                        <input type="text" className={css.contact__contact_detais__formulaire__name} placeholder="Flen ben foulen" />
                        <div className={css.contact__contact_detais__formulaire__sujettext}> Sujet</div>
                        <input type="text" className={css.contact__contact_detais__formulaire__sujet} placeholder="ex. demande d'informations" />
                        <div className={css.contact__contact_detais__formulaire__msgtext}> Message</div>
                        <textarea className={css.contact__contact_detais__formulaire__msg} rows="7" cols="35">
                        </textarea>
                        <div className={css.contact__contact_detais__formulaire__envoyer}>
                            <button onClick={() => window.location.href = "/contact-us"}
                                className={css.contact__contact_detais___formulaire__envoyer}>
                                Envoyer
                        </button>
                        </div>
                    </div>

                    <div className={css.contact__contact_detais__numeromap}>
                        <div className={css.contact__contact_detais__numeromap__adresse}>
                            <div className={css.contact__contact_detais__numeromap__adresse__icon}>
                                <img src={mapicon} alt="mapicon"></img>

                            </div>
                            <div className={css.contact__contact_detais__numeromap__adresse__ligne}>

                            </div>
                            <div className={css.contact__contact_detais__numeromap__adresse__adressetext}>
                           <div>
                                <div> {data.address}</div>
                                <div >{data.city} +{data.country}</div>
                            
                            </div>
                            </div>
                        </div>
                        <div className={css.contact__contact_detais__numeromap__numero}>
                            <div className={css.contact__contact_detais__numeromap__numero__icon}>
                                <img src={phoneicon} alt="phoneicon"></img>
                            </div>
                            <div className={css.contact__contact_detais__numeromap__numero__ligne}>

                            </div>
                            <div className={css.contact__contact_detais__numeromap__numero__numerotext}>
                                 <div> {data.phoneNumber1}</div>
                                <div >{data.phoneNumber2}</div>
                        
                            </div>
                        </div>

                        <div className={css.contact__contact_detais__numeromap__numero}>
                            <div className={css.contact__contact_detais__numeromap__numero__icon}>
                                {/* <img src={phoneicon} alt="phoneicon"></img> */}
                                <span> Social Media</span>
                            </div>
                            <div className={css.contact__contact_detais__numeromap__numero__ligne}>

                            </div>
                            <div className={css.contact__contact_detais__numeromap__numero__numerotext}>
                                <div> 
                                    
                                    <a href ={data.website.contact.body.facebook}>
                                        <img className={css.fb} src={fb} target="_blank" alt="fb" />
                                    </a>
                                    <a href ={data.website.contact.body.instagram}>
                                        <img className={css.fb} 
                                        src={instagram}
                                         target="_blank" alt="instagram" />
                                    </a>
                                  
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
 )}
 export default ContactV1