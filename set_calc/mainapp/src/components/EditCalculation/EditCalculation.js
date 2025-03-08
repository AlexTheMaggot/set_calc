import React, {useEffect} from "react";
import "./EditCalculation.css";
import api_sender from "../api_sender";


export default function EditCalculation(props) {
    const text_content = {
        "title_ru": "Изменение",
        "title_uz": "Haqiqatan ham hisob-kitobni o‘chirib tashlamoqchimisiz?",
        "edit_ru": "Изменить",
        "edit_uz": "O'zgartirish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const edit_calculation = () => {
        props.set_calculations_update(true)
        props.close_calculation_modal(props.set_edit_calculation_modal)
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
                <input type="text" list="mans"/>
                <datalist id="mans">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
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