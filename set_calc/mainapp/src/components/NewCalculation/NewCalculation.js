import React, {useEffect} from "react";
import "./NewCalculation.css";
import api_sender from "../api_sender";


export default function NewCalculation(props) {
    const text_content = {
        "add_ru": "Добавить",
        "add_uz": "Qo'shish",
    }
    const add_calculation = () => {
        let r = api_sender('CalculationAdd', 1)
        r.then(data => {
            console.log(data)
            props.close_new_calculation()
        })
    }
    return (
        <div onClick={props.close_new_calculation} className={props.new_calculation_appear ? "new-calculation" : "new-calculation new-calculation_hidden"}>
            <div onClick={(e) => {e.stopPropagation()}} className={"new-calculation__block" + (props.new_calculation_block_appear !== true ? " new-calculation__block_hidden" : "") + (props.new_calculation_block_show !== true ? " new-calculation__block_none" : "")}>
                <button onClick={add_calculation} className="new-calculation__add">{text_content["add_" + props.lang]}</button>
            </div>
        </div>
    )
}