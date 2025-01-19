import React from "react";
import "./CoefficientList.css"
export default function CoefficientList(props) {
    const text_content = {
        "main_ru": "Coefficient List Ru",
        "main_uz": "Coefficient List Uz",
    }
    return (
        <div className="coefficientlist">
            <h1>{props.lang === "ru" ? text_content.main_ru : text_content.main_uz}</h1>
        </div>
    )
}