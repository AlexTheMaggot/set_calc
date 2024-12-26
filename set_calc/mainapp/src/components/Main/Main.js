import React, {Component, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import "./Main.css"
import Auth from "../Auth/Auth";
import CalculationListRu from "../CalculationList/CalculationListRu";
import CalculationListUz from "../CalculationList/CalculationListUz";
import CoefficientListRu from "../CoefficientList/CoefficientListRu";
import CoefficientListUz from "../CoefficientList/CoefficientListUz";
import HandbookListRu from "../HandbookList/HandbookListRu";
import HandbookListUz from "../HandbookList/HandbookListUz";
import api_sender from "../api_sender";


export default function Main(props) {
    let [navigate, set_navigate] = useState('')
    let [main_show, set_main_show] = useState(true)
    let [auth, set_auth] = useState(false)
    let auth_checker = () => {
        if (auth === false) {
            let response = api_sender('AuthCheck', 1)
            response.then((data) => {
                if (data.result === false && location.pathname !== '/auth/') {
                    set_navigate('auth')
                }
                else {
                    set_auth(true)
                    if (location.pathname === '/') {
                        let r = api_sender('LangCheck', 1);
                        r.then((data) => {
                            if (data.result === 'ru') {
                                set_navigate('home_ru')
                            }
                            else if (data.result === 'uz') {
                                set_navigate('home_uz')
                            }
                        })
                    }
                }
            })
        }
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
    })
    return (
            <div className={main_show ? 'main' : 'main main_hidden'}>
                {navigate === 'auth' && <Navigate to="/auth/" />}
                {navigate === 'calculation_list_ru' && <Navigate to="/ru/calculations/" />}
                {navigate === 'calculation_list_uz' && <Navigate to="/uz/calculations/" />}
                {navigate === 'coefficient_list_ru' && <Navigate to="/ru/coefficients/" />}
                {navigate === 'coefficient_list_uz' && <Navigate to="/uz/coefficients/" />}
                {navigate === 'handbook_list_ru' && <Navigate to="/ru/handbooks/" />}
                {navigate === 'handbook_list_uz' && <Navigate to="/uz/handbooks/" />}
                {props.level === 'auth' && <Auth navi={navi} />}
                {props.level === 'calculation_list_ru' && <CalculationListRu />}
                {props.level === 'calculation_list_uz' && <CalculationListUz />}
                {props.level === 'coefficient_list_ru' && <CoefficientListRu />}
                {props.level === 'coefficient_list_uz' && <CoefficientListUz />}
                {props.level === 'handbook_list_ru' && <HandbookListRu />}
                {props.level === 'handbook_list_uz' && <HandbookListUz />}
            </div>
        );
}
