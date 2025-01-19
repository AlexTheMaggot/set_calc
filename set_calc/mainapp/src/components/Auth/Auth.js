import React, {useEffect, useState} from "react";
import "./Auth.css"
import api_sender from "../api_sender";

export default function Auth(props) {
    const [login, set_login] = useState("")
    const [password, set_password] = useState("")
    const [login_wrong, set_login_wrong] = useState(false)
    const text_content = {
        "login_ru": "Логин",
        "login_uz": "Login",
        "password_ru": "Пароль",
        "password_uz": "Parol",
        "enter_ru": "Войти",
        "enter_uz": "Tizimga kirish",
        "wrong_login_ru": "Неправильный логин или пароль",
        "wrong_login_uz": "Noto'g'ri login yoki parol",
    }
    let form_sender = (e) => {
        e.preventDefault()
        let r = api_sender("Auth", 1, {
            login: login,
            password: password,
            lang: props.lang
        })
        r.then((data) => {
            if ("error" in data) {
                set_login_wrong(true)
                setTimeout(() => {
                    set_login_wrong(false)
                }, 1000)
            }
            else {
                props.navi(e, "calculation_list")
            }
        })
    }
    useEffect(() => {
        props.set_lang("ru")
    }, []);
    return (
        <div className="auth">
            <div className="auth__wrap">
                <div className="auth__img-wrap">
                    <img src="/static/img/SET.svg" className="auth__img" alt=""/>
                </div>
                <div className="auth__form-wrap">
                    <form onSubmit={(e) => {form_sender(e)}} action="" className="auth__form">
                        <input onChange={(e) => {set_login(e.target.value)}} type="text" className={login_wrong ? "auth__input auth__input_wrong" : "auth__input" } placeholder={text_content["login_" + props.lang]}/>
                        <input onChange={(e) => {set_password(e.target.value)}} type="password" className={login_wrong ? "auth__input auth__input_wrong" : "auth__input" } placeholder={text_content["password_" + props.lang]}/>
                        <p className={login_wrong ? "auth__wrong" : "auth__wrong auth__wrong_hidden" }>{text_content["wrong_login_" + props.lang]}</p>
                        <input className="auth__submit" type="submit" value={text_content["enter_" + props.lang]}/>
                        <div className="auth__radio-wrap">
                            <label onClick={() => {props.set_lang("ru")}} id="auth_lang_ru" htmlFor="auth-radio-ru" className={props.lang === "ru" ? "auth__label auth__label_checked" : "auth__label"}>
                                <img src="/static/img/RUS.svg" alt="" className="auth__label-img"/>
                                <input type="radio" name="lang" id="auth-radio-ru" className="auth__radio"/>
                                <p className="auth__label-text">Руc</p>
                            </label>
                            <label onClick={() => {props.set_lang("uz")}} id="auth_lang_uz" htmlFor="auth-radio-uz" className={props.lang === "uz" ? "auth__label auth__label_checked" : "auth__label"}>
                                <img src="/static/img/UZB.svg" alt="" className="auth__label-img"/>
                                <input type="radio" name="lang" id="auth-radio-uz" className="auth__radio"/>
                                <p className="auth__label-text">O"zb</p>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
