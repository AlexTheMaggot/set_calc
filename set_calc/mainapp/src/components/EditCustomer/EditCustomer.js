import React, {useEffect, useState} from "react";
import "./EditCustomer.css";
import api_sender from "../api_sender";


export default function EditCustomer(props) {
    const text_content = {
        "title_ru": "Изменение",
        "title_uz": "O'zgartirish",
        "edit_ru": "Изменить",
        "edit_uz": "O'zgartirish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const [customer_name, set_customer_name] = useState(props.customer.name)
    const edit_customer = () => {
        let r = api_sender('CustomerUpdate', 1, {id: props.customer.id, name: customer_name})
        r.then(() => {
            props.set_customers_update(true)
            props.close_modal(props.set_edit_customer_modal)
        })
    }
    return (
        <div onClick={() => {
            props.close_modal(props.set_edit_customer_modal)
        }}
             className={props.edit_customer_modal.wrapper.appear ? "editcustomer" : "editcustomer editcustomer_hidden"}>
            <div onClick={(e) => {
                e.stopPropagation()
            }}
                 className={"editcustomer__block" + (props.edit_customer_modal.block.appear !== true ? " editcustomer__block_hidden" : "") + (props.edit_customer_modal.block.show !== true ? " editcustomer__block_none" : "")}>
                <p className="editcustomer__title">{text_content['title_' + props.lang]}</p>
                <input onChange={(e) => {set_customer_name(e.target.value)}} value={customer_name} className="editcustomer__input" type="text"/>
                <div className="editcustomer__button-wrapper">
                    <button onClick={edit_customer}
                            className="editcustomer__btn editcustomer__btn_yellow">{text_content["edit_" + props.lang]}</button>
                    <button onClick={() => {
                        props.close_modal(props.set_edit_customer_modal)
                    }}
                            className="editcustomer__btn editcustomer__btn_black">{text_content["cancel_" + props.lang]}</button>
                </div>
            </div>
        </div>
)
}