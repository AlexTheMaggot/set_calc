import React, {useEffect, useState} from "react";
import "./EditCalculation.css";
import api_sender from "../api_sender";


export default function EditCalculation(props) {
    const [calculation_manager, set_calculation_manager] = useState(props.calculation.user.username)
    const [calculation_customer, set_calculation_customer] = useState(props.calculation.customer.name)
    const [managers, set_managers] = useState([])
    const [customers, set_customers] = useState([])
    const text_content = {
        "title_ru": "Изменение",
        "title_uz": "Haqiqatan ham hisob-kitobni o‘chirib tashlamoqchimisiz?",
        "edit_ru": "Изменить",
        "edit_uz": "O'zgartirish",
        "cancel_ru": "Отмена",
        "cancel_uz": "Bekor qilish",
    }
    const edit_calculation = () => {
        let r = api_sender(
            'CalculationUpdate',
            1,
            {
                id: props.calculation.id,
                manager: calculation_manager,
                customer: calculation_customer,
            }
        )
        r.then(() => {
            props.set_calculations_update(true)
            props.close_modal(props.set_edit_calculation_modal)
        })
    }
    const calculation_manager_blur = (text) => {
        let u = managers.find(user => user.username === text)
        if (u === undefined) {
            set_calculation_manager("")
        }
    }
    const calculation_customer_blur = (text) => {
        let u = customers.find(customer => customer.name === text)
        if (u === undefined) {
            set_calculation_customer("")
        }
    }
    useEffect(() => {
        let customers_request = api_sender('CustomerGet', 1)
        customers_request.then((data) => {
            set_customers(data.result)
        })
        let managers_request = api_sender('UserGet', 1)
        managers_request.then((data) => {
            set_managers(data.result)
        })
    }, []);
    return (
        <div onClick={() => {
            props.close_modal(props.set_edit_calculation_modal)
        }}
             className={props.edit_calculation_modal.wrapper.appear ? "editcalculation" : "editcalculation editcalculation_hidden"}>
            <div onClick={(e) => {
                e.stopPropagation()
            }}
                 className={"editcalculation__block" + (props.edit_calculation_modal.block.appear !== true ? " editcalculation__block_hidden" : "") + (props.edit_calculation_modal.block.show !== true ? " editcalculation__block_none" : "")}>
                <p className="editcalculation__title">{text_content['title_' + props.lang]}</p>
                <input
                    onBlur={(e) => {calculation_manager_blur(e.target.value)}}
                    list="managers" value={calculation_manager} className="editcalculation__input" type="text"
                    onChange={(e) => {set_calculation_manager(e.target.value)}}
                />
                <datalist id="managers">
                    {managers.map((manager) => (
                        <option key={manager.id} value={manager.username}></option>
                    ) )}
                </datalist>
                <input
                    type="text" className="editcalculation__input" value={calculation_customer} list="customers"
                    onChange={(e) => {set_calculation_customer(e.target.value)}}
                    onBlur={(e) => {calculation_customer_blur(e.target.value)}}
                />
                <datalist id="customers">
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.name}></option>
                    ))}
                </datalist>
                <div className="editcalculation__button-wrapper">
                    <button
                        onClick={edit_calculation}
                        className="editcalculation__btn editcalculation__btn_yellow"
                    >
                        {text_content["edit_" + props.lang]}
                    </button>
                    <button
                        onClick={() => {props.close_modal(props.set_edit_calculation_modal)}}
                        className="editcalculation__btn editcalculation__btn_black"
                    >
                        {text_content["cancel_" + props.lang]}
                    </button>
                </div>
            </div>
        </div>
)
}