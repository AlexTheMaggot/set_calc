import React from "react";
import "./CalculationList.css";
export default function CalculationList(props) {
    const text_content = {
        "main_ru": "Calculation List Ru",
        "main_uz": "Calculation List Uz",
    }
    return (
        <div className="calculationlist">
            <h1>{props.lang === "ru" ? text_content.main_ru : text_content.main_uz}</h1>
        </div>
    )
}