import React from "react";
import "./HandbookList.css"
export default function HandbookList(props) {
    const text_content = {
        "main_ru": "Handbook List Ru",
        "main_uz": "Handbook List Uz",
    }
    return (
        <div className="handbooklist">
            <h1>{props.lang === "ru" ? text_content.main_ru : text_content.main_uz}</h1>
        </div>
    )
}