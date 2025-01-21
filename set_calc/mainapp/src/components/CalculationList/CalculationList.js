import React from "react";
import "./CalculationList.css";
export default function CalculationList(props) {
    const text_content = {
        "main_ru": "Мои Рассчеты",
        "main_uz": "Mening hisoblarim",
        "add_ru": "Новый рассчет",
        "add_uz": "Yangi hisoblash",
    }
    return (
        <div className="calculationlist">
            <div className="calculationlist__block">
                <div className="calculationlist__top">
                    <h1 className="calculationlist__title">{text_content["main_" + props.lang]}</h1>
                    <button className="calculationlist__add-calculation">{text_content["add_" + props.lang]}</button>
                </div>
            </div>
        </div>
    )
}