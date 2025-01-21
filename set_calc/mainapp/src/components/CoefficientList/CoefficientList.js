import React from "react";
import "./CoefficientList.css"
export default function CoefficientList(props) {
    const text_content = {
        "main_ru": "Коэффициенты",
        "main_uz": "Koeffitsientlar",
    }
    return (
        <div className="coefficientlist">
            <div className="coefficientlist__block">
                <div className="coefficientlist__top">
                    <h1 className="coefficientlist__title">{text_content["main_" + props.lang]}</h1>
                </div>
            </div>
        </div>
    )
}