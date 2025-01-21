import React from "react";
import "./HandbookList.css"
export default function HandbookList(props) {
    const text_content = {
        "main_ru": "Справочники",
        "main_uz": "Kataloglar",
    }
    return (
        <div className="handbooklist">
            <div className="handbooklist__block">
                <div className="handbooklist__top">
                    <h1 className="handbooklist__title">{text_content["main_" + props.lang]}</h1>
                </div>
            </div>
        </div>
    )
}