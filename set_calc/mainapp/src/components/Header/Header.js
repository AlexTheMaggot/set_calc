import React from "react";
import api_sender from "../api_sender";
import "./Header.css";


export default function Header(props) {
    const text_content = {
        "main_ru": "Header Ru",
        "main_uz": "Header Uz",
        "exit_ru": "Выйти",
        "exit_uz": "Chiqish",
    }
    let exit_fetch = (e) => {
        let r = api_sender('Logout', 1)
        r.then(data => {
            if (data.result === 'Success') {
                props.navi(e, 'auth')
            }
        })
    }

    return (
        <div className="header">
            <h1>{props.lang === "ru" ? text_content.main_ru : text_content.main_uz}</h1>
            <button className="header__exit" onClick={(e) => {exit_fetch(e)}}>
                {props.lang === "ru" ? text_content.exit_ru : text_content.exit_uz}
            </button>
        </div>
    )
}