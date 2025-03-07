import React, {useEffect} from "react";
import "./NewCalculation.css";
import api_sender from "../api_sender";


export default function NewCalculation(props) {
    const text_content = {
        "add_ru": "Добавить",
        "add_uz": "Qo'shish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const add_calculation = () => {
        let r = api_sender('CalculationAdd', 1)
        r.then(data => {
            props.set_calculations_update(true)
            props.close_calculation_modal(props.set_new_calculation_modal)
        })
    }
    return (
        <div onClick={() => {props.close_calculation_modal(props.set_new_calculation_modal)}} className={props.new_calculation_modal.wrapper.appear ? "newcalculation" : "newcalculation newcalculation_hidden"}>
            <div onClick={(e) => {e.stopPropagation()}} className={"newcalculation__block" + (props.new_calculation_modal.block.appear !== true ? " newcalculation__block_hidden" : "") + (props.new_calculation_modal.block.show !== true ? " newcalculation__block_none" : "")}>
                <div className="newcalculation__btn-wrapper">
                    <button onClick={add_calculation} className="newcalculation__btn newcalculation__btn_green">{text_content["add_" + props.lang]}</button>
                    <button onClick={() => {props.close_calculation_modal(props.set_new_calculation_modal)}} className="newcalculation__btn newcalculation__btn_black">{text_content[`cancel_${props.lang}`]}</button>
                </div>
            </div>
        </div>
    )
}