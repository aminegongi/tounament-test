import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import './inscription.scss'
const Inscription = ({ isModalVisible, setIsModalVisible }) => {



    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>

            <Modal footer={null} className="inscription" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="inscription__title">
                    Créer un compte
                </div>
                <div className="inscription__input">
                    <div className="inscription__input__inscrit">
                        <input type="text" placeholder="Prénom" />
                    </div>
                    <div className="inscription__input__inscrit">
                        <input type="text" placeholder="Nom de famille" />

                    </div>
                    <div className="inscription__input__inscrit">
                        <input type="text" placeholder="Email" />
                    </div>
                    <div className="inscription__input__inscrit">
                        <input type="text" placeholder="Date de naissance " />
                    </div>
                    <div className="inscription__input__inscrit">
                        <input type="text" placeholder="Numéro de télèphone" />
                        <div className="inscription__input__inscrit__message">Votre numéro va être envoyé à l'entraîneur
                        pour valider votre cours..
                        </div>
                    </div>
                    <div className="inscription__input__inscrit">
                        <input type="text" placeholder="Mot de passe" />
                    </div>
                    <div className="inscription__input__inscrit">
                        <input type="text" placeholder="confirmer Mot de passe" />
                    </div>
                </div>
                <button className="inscription__button_inscription">
                    <span>S'inscrire</span>
                </button>
                <div className="inscription__signup">
                    <div className="inscription__signup__already_registered">
                        Vous avez déjà un compte ?</div>
                        <div className="inscription__signup__contact">

                        Connectez-vous</div>
                </div>
            </Modal>
        </>
    );
};
export default Inscription