import React, {useEffect, useState} from "react";
import "./NewCalculation.css";
import api_sender from "../api_sender";


export default function NewCalculation(props) {
    const text_content = {
        "add_ru": "Добавить",
        "add_uz": "Qo'shish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const [customers, set_customers] = useState([])
    const [calculation_customer, set_calculation_customer] = useState("")
    const calculation_customer_change = (text) => {
        set_calculation_customer(text)
    }
    const calculation_customer_blur = (text) => {
        let u = customers.find(customer => customer.name === text)
        if (u === undefined) {
            set_calculation_customer("")
        }
    }
    const add_calculation = () => {
        let r = api_sender('CalculationAdd', 1, {customer: calculation_customer})
        r.then(data => {
            props.set_calculations_update(true)
            props.close_modal(props.set_new_calculation_modal)
        })
    }
    useEffect(() => {
        let r = api_sender('CustomerGet', 1)
        r.then((data) => {
            set_customers(data.result)
        })
    }, []);
    return (
        <div
            onClick={() => {props.close_modal(props.set_new_calculation_modal)}}
            className={props.new_calculation_modal.wrapper.appear ? "newcalculation" : "newcalculation newcalculation_hidden"}
        >
            <div
                onClick={(e) => {e.stopPropagation()}}
                className={"newcalculation__block" + (props.new_calculation_modal.block.appear !== true ? " newcalculation__block_hidden" : "") + (props.new_calculation_modal.block.show !== true ? " newcalculation__block_none" : "")}
            >
                <input
                    onBlur={(e) => {calculation_customer_blur(e.target.value)}}
                    onChange={(e) => {calculation_customer_change(e.target.value)}}
                    list="customers" type="text" className="newcalculation__input"
                />
                <datalist id="customers">
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.name}></option>
                    ))}
                </datalist>
                <div className="newcalculation__btn-wrapper">
                    <button onClick={add_calculation} className="newcalculation__btn newcalculation__btn_green">{text_content["add_" + props.lang]}</button>
                    <button onClick={() => {props.close_modal(props.set_new_calculation_modal)}} className="newcalculation__btn newcalculation__btn_black">{text_content[`cancel_${props.lang}`]}</button>
                </div>
            </div>
        </div>
    )
}