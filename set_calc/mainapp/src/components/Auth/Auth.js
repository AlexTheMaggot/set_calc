import React, {useEffect} from "react";
import "./Auth.css"

export default function Auth(props) {
    let lang_handler = (element) => {
        if (element === 'ru') {
            let add = document.getElementById('auth_lang_ru')
            add.classList.add('auth__label_checked')
            let rem = document.getElementById('auth_lang_uz')
            rem.classList.remove('auth__label_checked')
        }
        else if (element === 'uz') {
            let add = document.getElementById('auth_lang_uz')
            add.classList.add('auth__label_checked')
            let rem = document.getElementById('auth_lang_ru')
            rem.classList.remove('auth__label_checked')
        }
    }
    return (
        <div className="auth">
            <div className="auth__wrap">
                <div className="auth__img-wrap">
                    <img src="/static/img/SET.svg" className="auth__img" alt=""/>
                </div>
                <div className="auth__form-wrap">
                    <form action="" className="auth__form">
                        <input type="text" className="auth__input" placeholder="Логин"/>
                        <input type="password" className="auth__input" placeholder="Пароль"/>
                        <div className="auth__radio-wrap">
                            <label onClick={() => {lang_handler('ru')}} id="auth_lang_ru" htmlFor="auth-radio-ru" className="auth__label auth__label_checked">
                                <img src="/static/img/RUS.svg" alt="" className="auth__label-img"/>
                                <input type="radio" name="lang" id="auth-radio-ru" className="auth__radio" defaultChecked/>
                                <p className="auth__label-text">Руc</p>
                            </label>
                            <label onClick={() => {
                                lang_handler('uz')
                            }} id="auth_lang_uz" htmlFor="auth-radio-uz" className="auth__label">
                                <img src="/static/img/UZB.svg" alt="" className="auth__label-img"/>
                                <input type="radio" name="lang" id="auth-radio-uz" className="auth__radio"/>
                                <p className="auth__label-text">O'zb</p>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}