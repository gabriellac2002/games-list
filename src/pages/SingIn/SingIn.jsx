import React from "react";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/footer";

import '../Login/login.css';

import logo from '../../assets/logo.png';

const SingIn = () => {
    return(
        <div className="body_cadastro">
            <Navbar></Navbar>
            <div className="rest_page">
                <div className="container_login">
                    <div className="container_image_login">
                        <img src={logo} className="logo_login"></img>
                    </div>
                    <div className="container_inputs">
                        <p>Email:</p>
                        <input className="input_login" type="text"></input>
                        <p>Senha:</p>
                        <input className="input_login" type="password"></input>
                        <button className="button_submit">Cadastrar</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default SingIn;