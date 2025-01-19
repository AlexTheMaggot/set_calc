import React from "react";
import "./Sidebar.css";

export default function Sidebar(props) {
    const text_content = {
        "main_ru": "Sidebar Ru",
        "main_uz": "Sidebar Uz",
        "calculations_ru": "Рассчеты",
        "calculations_uz": "Hisob-kitoblar",
        "handbooks_ru": "Справочники",
        "handbooks_uz": "Kataloglar",
        "coefficients_ru": "Коэффициенты",
        "coefficients_uz": "Koeffitsientlar",
    }
    return (
        <div className="sidebar">
            <ul className="sidebar__ul">
                <li className="sidebar__li" onClick={(e) => {props.navi(e, 'calculation_list')}}>
                    <img src="/static/img/calculation.svg" alt="" className="sidebar__link-icon"/>
                    <a href="#" className="sidebar__link">{text_content["calculations_" + props.lang]}</a>
                </li>
                <li className="sidebar__li" onClick={(e) => {props.navi(e, 'coefficient_list')}}>
                    <img src="/static/img/coefficient.svg" alt="" className="sidebar__link-icon"/>
                    <a href="#" className="sidebar__link">{text_content["coefficients_" + props.lang]}</a>
                </li>
                <li className="sidebar__li" onClick={(e) => {props.navi(e, 'handbook_list')}}>
                    <img src="/static/img/handbook.svg" alt="" className="sidebar__link-icon"/>
                    <a href="#" className="sidebar__link">{text_content["handbooks_" + props.lang]}</a>
                </li>
            </ul>
        </div>
    )
}