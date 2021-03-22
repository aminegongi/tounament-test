import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import './login.scss'
const Login = ({ isModalVisibleLogin, setIsModalVisibleLogin }) => {



    const handleOk = () => {
        setIsModalVisibleLogin(false);
    };

    const handleCancel = () => {
        setIsModalVisibleLogin(false);
    };

    return (
        <>

            <Modal footer={null} className="login" visible={isModalVisibleLogin} onOk={handleOk} onCancel={handleCancel}>
                <div className="login__title">
                    Connectez-vous
                </div>
                <div className="login__input">
                    <div className="login__input__inscrit">
                        <input type="text" placeholder="Email" />
                    </div>
                    <div className="login__input__inscrit">
                        <input type="text" placeholder="Mot de passe" />

                    </div>

                </div>
                <div className="inscription__signup">
                    <div className="inscription__signup__already_registered">
                        Mot de passe oublié?</div>

                </div>
                <button className="inscription__button_inscription">
                    <span>Se connecter</span>
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
export default Login