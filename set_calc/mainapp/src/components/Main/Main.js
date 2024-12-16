import React, {Component, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import "./Main.css"
import Auth from "../Auth/Auth";
import HomeRu from "../Home/HomeRu";
import HomeUz from "../Home/HomeUz";
import api_sender from "../api_sender";


export default function Main(props) {
    let [navigate, set_navigate] = useState('')
    let auth_checker = () => {
        let response = api_sender('AuthCheck', 1)
        response.then((data) => {
            if (data.result === false) {
                set_navigate('auth')
            }
        })
    }
    useEffect(() => {
        auth_checker()
    })
    return (
            <div className="main">
                {navigate === 'auth' && <Navigate to="/auth/" />}
                {navigate === 'home_ru' && <Navigate to="/auth/" />}
                {navigate === 'home_uz' && <Navigate to="/auth/" />}
                {props.level === 'auth' && <Auth />}
                {props.level === 'home_ru' && <HomeRu />}
                {props.level === 'home_uz' && <HomeUz />}
            </div>
        );
}
