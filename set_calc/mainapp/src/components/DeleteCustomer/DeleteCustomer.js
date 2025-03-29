import React, {useEffect} from "react";
import "./DeleteCustomer.css";
import api_sender from "../api_sender";


export default function DeleteCustomer(props) {
    const text_content = {
        "title_ru": "Вы действительно хотите удалить клиента?",
        "title_uz": "Mijozni oʻchirib tashlamoqchimisiz?",
        "delete_ru": "Удалить",
        "delete_uz": "Oʻchirish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const delete_customer = () => {
        let r = api_sender('CustomerDelete', 1, {id: props.customer.id})
        r.then(data => {
            props.set_customers_update(true)
            props.close_modal(props.set_delete_customer_modal)
        })
    }
    return (
        <div onClick={() => {props.close_modal(props.set_delete_customer_modal)}} className={props.delete_customer_modal.wrapper.appear ? "deletecustomer" : "deletecustomer deletecustomer_hidden"}>
            <div onClick={(e) => {e.stopPropagation()}} className={"deletecustomer__block" + (props.delete_customer_modal.block.appear !== true ? " deletecustomer__block_hidden" : "") + (props.delete_customer_modal.block.show !== true ? " deletecustomer__block_none" : "")}>
                <p className="deletecustomer__title">{text_content['title_' + props.lang]}</p>
                <div className="deletecustomer__button-wrapper">
                    <button onClick={delete_customer} className="deletecustomer__btn deletecustomer__btn_red">{text_content["delete_" + props.lang]}</button>
                    <button onClick={() => {props.close_modal(props.set_delete_customer_modal)}} className="deletecustomer__btn deletecustomer__btn_black">{text_content["cancel_" + props.lang]}</button>
                </div>
            </div>
        </div>
    )
}