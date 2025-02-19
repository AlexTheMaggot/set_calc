import React, {useState} from "react";
import api_sender from "../api_sender";
import "./Header.css";


export default function Header(props) {
    const [lang_change, set_lang_change] = useState(false)
    const text_content = {
        "main_ru": "Header Ru",
        "main_uz": "Header Uz",
        "exit_ru": "Выйти",
        "exit_uz": "Chiqish",
        "search_ru": "Поиск...",
        "search_uz": "Qidiruv...",
    }
    let exit_fetch = (e) => {
        let r = api_sender('Logout', 1)
        r.then(data => {
            if (data.result === 'Success') {
                props.navi(e, 'auth')
            }
        })
    }
    let lang_change_fetch = (lang) => {
        let r = api_sender("LangChange", 1, {lang: lang})
        r.then(data => {
            if (data.result === "Success") {
                props.set_lang(lang)
            }
        })
    }
    return (
        <div className="header" onMouseLeave={() => {set_lang_change(false)}}>
            <div className="header__left">
                <input type="text" className="header__search" placeholder={text_content["search_" + props.lang]}/>
            </div>
            <div className="header__right">
                <div className="header__lang-wrap" onMouseEnter={() => {set_lang_change(true)}}>
                    {props.lang === "ru" ? <img src="/static/img/RUS.svg" alt="" className="header__lang-flag"/> :
                        <img src="/static/img/UZB.svg" alt="" className="header__lang-flag"/>}
                    <img src="/static/img/arrow.svg" alt="" className="header__lang-arrow"/>
                    <div className={lang_change ? "header__lang-checker" : "header__lang-checker header__lang-checker_none" }>
                        {props.lang === "ru" ? <img src="/static/img/UZB.svg" onClick={() => {lang_change_fetch("uz")}} alt="" className="header__lang-item"/> : <img src="/static/img/RUS.svg" onClick={() => {lang_change_fetch("ru")}} alt="" className="header__lang-item"/>}
                    </div>
                </div>
                <button className="header__exit" onClick={(e) => {
                    exit_fetch(e)
                }}>
                    {props.lang === "ru" ? text_content.exit_ru : text_content.exit_uz}
                </button>
            </div>
        </div>
    )
}