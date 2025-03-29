import React, {useEffect} from "react";
import "./DeleteCalculation.css";
import api_sender from "../api_sender";


export default function DeleteCalculation(props) {
    const text_content = {
        "title_ru": "Вы действительно хотите удалить рассчет?",
        "title_uz": "Haqiqatan ham hisob-kitobni o‘chirib tashlamoqchimisiz?",
        "delete_ru": "Удалить",
        "delete_uz": "Oʻchirish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const delete_calculation = () => {
        let r = api_sender('CalculationDelete', 1, {id: props.calculation.id})
        r.then(data => {
            props.set_calculations_update(true)
            props.close_modal(props.set_delete_calculation_modal)
        })
    }
    return (
        <div onClick={() => {props.close_modal(props.set_delete_calculation_modal)}} className={props.delete_calculation_modal.wrapper.appear ? "deletecalculation" : "deletecalculation deletecalculation_hidden"}>
            <div onClick={(e) => {e.stopPropagation()}} className={"deletecalculation__block" + (props.delete_calculation_modal.block.appear !== true ? " deletecalculation__block_hidden" : "") + (props.delete_calculation_modal.block.show !== true ? " deletecalculation__block_none" : "")}>
                <p className="deletecalculation__title">{text_content['title_' + props.lang]}</p>
                <div className="deletecalculation__button-wrapper">
                    <button onClick={delete_calculation} className="deletecalculation__btn deletecalculation__btn_red">{text_content["delete_" + props.lang]}</button>
                    <button onClick={() => {props.close_modal(props.set_delete_calculation_modal)}} className="deletecalculation__btn deletecalculation__btn_black">{text_content["cancel_" + props.lang]}</button>
                </div>
            </div>
        </div>
    )
}