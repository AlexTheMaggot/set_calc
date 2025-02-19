import React, {useEffect, useState} from "react";
import "./CalculationList.css";
import api_sender from "../api_sender";
export default function CalculationList(props) {
    const [calculations, calculations_set] = useState([])
    const text_content = {
        "main_ru": "Мои Рассчеты",
        "main_uz": "Mening hisoblarim",
        "add_ru": "Новый рассчет",
        "add_uz": "Yangi hisoblash",
    }
    useEffect(() => {
        let r = api_sender("CalculationGetList", 1)
        r.then(data => {
            calculations_set(data.result)
        })
    })
    return (
        <div className="calculationlist">
            <div className="calculationlist__block">
                <div className="calculationlist__top">
                    <h1 className="calculationlist__title">{text_content["main_" + props.lang]}</h1>
                    <button onClick={props.new_calculation} className="calculationlist__add-calculation">{text_content["add_" + props.lang]}</button>
                </div>
                <div className="calculationlist__data">
                    <table className="calculationlist__table">
                        <thead className="calculationlist__thead">
                        <tr className="calculationlist__tr">
                            <th className="calculationlist__th">ID</th>
                            <th className="calculationlist__th">Менеджер</th>
                            <th className="calculationlist__th">Редактировать</th>
                            <th className="calculationlist__th">Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {calculations.map((calculation) => (
                            <tr className="calculationlist__tr">
                                <td className="calculationlist__td">{calculation.id}</td>
                                <td className="calculationlist__td">{calculation.user.username}</td>
                                <td className="calculationlist__td">Редактировать</td>
                                <td className="calculationlist__td">Удалить</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}