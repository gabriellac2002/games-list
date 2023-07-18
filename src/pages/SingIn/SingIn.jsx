import React from "react";
import { useState } from "react";
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/footer";

import '../Login/login.css';

import logo from '../../assets/logo.png';

const SingIn = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const singIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, senha);
        } catch (err){
            
        }
        
    };

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
                        <input className="input_login" type="text" placeholder="exemplo@gmail.com" onChange={(e) => setEmail(e.target.value)}></input>
                        <p>Senha:</p>
                        <input className="input_login" type="password" placeholder="********" onChange={(e) => setSenha(e.target.value)}></input>
                        <button className="button_submit" onClick={singIn}>Cadastrar</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default SingIn;