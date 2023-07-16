import React from "react";
import { Link } from "react-router-dom";
import './login.css'

import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/Footer/footer'

//assets
import logo from '../../assets/logo.png';

const Login = () => {
    return(
        <div className="body_login">
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
                        <button className="button_submit">Enviar</button>
                        <div className="cadastro">
                            <Link to='/cadastro'><p>Cadastre-se</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Login