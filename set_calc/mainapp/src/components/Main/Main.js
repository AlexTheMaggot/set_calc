import React, {Component, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import "./Main.css"
import Auth from "../Auth/Auth";
import HomeRu from "../Home/HomeRu";
import HomeUz from "../Home/HomeUz";
import api_sender from "../api_sender";


export default function Main(props) {
    let [navigate, set_navigate] = useState('')
    let [main_show, set_main_show] = useState(true)
    let auth_checker = () => {
        let response = api_sender('AuthCheck', 1)
        response.then((data) => {
            if (data.result === false) {
                set_navigate('auth')
            }
        })
    }
    let navi = (e, level) => {
        e.preventDefault()
        set_main_show(false)
        setTimeout(() => {
            set_navigate(level)
        }, 300);
        setTimeout(() => {
            set_main_show(true)
        }, 600);
    }
    useEffect(() => {
        auth_checker()
        set_navigate('')
        if (location.pathname === '/') {
            let r = api_sender('LangCheck', 1);
            r.then((data) => {
                console.log(data.result === 'ru')
                if (data.result === 'ru') {
                    set_navigate('home_ru')
                }
                else if (data.result === 'uz') {
                    set_navigate('home_uz')
                }
            })
        }
    })
    return (
            <div className={main_show ? 'main' : 'main main_hidden'}>
                {navigate === 'auth' && <Navigate to="/auth/" />}
                {navigate === 'home_ru' && <Navigate to="/ru/" />}
                {navigate === 'home_uz' && <Navigate to="/uz/" />}
                {props.level === 'auth' && <Auth navi={navi} />}
                {props.level === 'home_ru' && <HomeRu />}
                {props.level === 'home_uz' && <HomeUz />}
            </div>
        );
}
