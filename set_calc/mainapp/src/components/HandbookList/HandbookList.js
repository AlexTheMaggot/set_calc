import React from "react";
import "./HandbookList.css"
export default function HandbookList(props) {
    const text_content = {
        "main_ru": "Справочники",
        "main_uz": "Kataloglar",
        "customers_ru": 'Клиенты',
        "customers_uz": "Mijozlar",
    }
    return (
        <div className="handbooklist">
            <div className="handbooklist__block">
                <div className="handbooklist__top">
                    <h1 className="handbooklist__title">{text_content["main_" + props.lang]}</h1>
                </div>
                <div className="handbooklist__items">
                    <div className="handbooklist__item">
                        <img className="handbooklist__item-img" src="/static/img/customers.svg"/>
                        <p className="handbooklist__item-title">{text_content["customers_" + props.lang]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}