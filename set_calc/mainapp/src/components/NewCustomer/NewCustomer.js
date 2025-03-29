import React, {useEffect, useState} from "react";
import "./NewCustomer.css";
import api_sender from "../api_sender";


export default function NewCustomer(props) {
    const text_content = {
        "add_ru": "Добавить",
        "add_uz": "Qo'shish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const [customer_name, set_customer_name] = useState("")
    const add_customer = () => {
        let r = api_sender('CustomerAdd', 1, {name: customer_name})
        r.then(data => {
            props.set_customers_update(true)
            props.close_modal(props.set_new_customer_modal)
        })
    }
    return (
        <div onClick={() => {props.close_modal(props.set_new_customer_modal)}} className={props.new_customer_modal.wrapper.appear ? "newcustomer" : "newcustomer newcustomer_hidden"}>
            <div onClick={(e) => {e.stopPropagation()}} className={"newcustomer__block" + (props.new_customer_modal.block.appear !== true ? " newcustomer__block_hidden" : "") + (props.new_customer_modal.block.show !== true ? " newcustomer__block_none" : "")}>
                <input className="newcustomer__input" onChange={(e) => {set_customer_name(e.target.value)}} type="text" />
                <div className="newcustomer__btn-wrapper">
                    <button onClick={add_customer} className="newcustomer__btn newcustomer__btn_green">{text_content["add_" + props.lang]}</button>
                    <button onClick={() => {props.close_modal(props.set_new_customer_modal)}} className="newcustomer__btn newcustomer__btn_black">{text_content[`cancel_${props.lang}`]}</button>
                </div>
            </div>
        </div>
    )
}