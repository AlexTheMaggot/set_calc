import React, {useEffect, useState} from "react";
import "./EditCalculation.css";
import api_sender from "../api_sender";


export default function EditCalculation(props) {
    const [calculation_manager, set_calculation_manager] = useState(props.calculation.user.username)
    const [managers, set_managers] = useState([props.calculation.user])
    const text_content = {
        "title_ru": "Изменение",
        "title_uz": "Haqiqatan ham hisob-kitobni o‘chirib tashlamoqchimisiz?",
        "edit_ru": "Изменить",
        "edit_uz": "O'zgartirish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const edit_calculation = () => {
        let r = api_sender('CalculationUpdate', 1, {id: props.calculation.id, manager: calculation_manager})
        r.then(() => {
            props.set_calculations_update(true)
            props.close_calculation_modal(props.set_edit_calculation_modal)
        })
    }
    const calculation_manager_change = (text) => {
        const r = api_sender('UserGet', 1, {username: text})
        r.then(data => {
            set_managers(data.result)
            set_calculation_manager(text)
        })
    }
    const calculation_manager_blur = (text) => {
        let u = managers.find(user => user.username === text)
        if (u === undefined) {
            set_calculation_manager("")
        }
    }
    return (
        <div onClick={() => {
            props.close_calculation_modal(props.set_edit_calculation_modal)
        }}
             className={props.edit_calculation_modal.wrapper.appear ? "editcalculation" : "editcalculation editcalculation_hidden"}>
            <div onClick={(e) => {
                e.stopPropagation()
            }}
                 className={"editcalculation__block" + (props.edit_calculation_modal.block.appear !== true ? " editcalculation__block_hidden" : "") + (props.edit_calculation_modal.block.show !== true ? " editcalculation__block_none" : "")}>
                <p className="editcalculation__title">{text_content['title_' + props.lang]}</p>
                <input onBlur={(e) => {calculation_manager_blur(e.target.value)}} list="managers" onChange={(e) => {calculation_manager_change(e.target.value)}} value={calculation_manager} className="editcalculation__input" type="text"/>
                <datalist id="managers">
                    {managers.map((manager) => (
                        <option key={manager.id} value={manager.username}></option>
                    ) )}
                </datalist>
                <div className="editcalculation__button-wrapper">
                    <button onClick={edit_calculation}
                            className="editcalculation__btn editcalculation__btn_yellow">{text_content["edit_" + props.lang]}</button>
                    <button onClick={() => {
                        props.close_calculation_modal(props.set_edit_calculation_modal)
                    }}
                            className="editcalculation__btn editcalculation__btn_black">{text_content["cancel_" + props.lang]}</button>
                </div>
            </div>
        </div>
)
}