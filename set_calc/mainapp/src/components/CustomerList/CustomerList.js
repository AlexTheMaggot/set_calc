import React, {useEffect, useState} from "react";
import "./CustomerList.css";
import api_sender from "../api_sender";
export default function CustomerList(props) {
    const [customers, customers_set] = useState([])
    const text_content = {
        "customers_ru": "Клиенты",
        "customers_uz": "Mijozlar",
        "add_ru": "Создать",
        "add_uz": "Yaratish",
        "back_ru": "Назад в справочник",
        "back_uz": "Ma'lumotga qaytish",
        "name_ru": "Имя (название компании)",
        "name_uz": "Ism (kompaniya nomi)",
        "edit_ru": "Редактировать",
        "edit_uz": "Tahrirlash",
        "delete_ru": "Удалить",
        "delete_uz": "Oʻchirish",
    }
    useEffect(() => {
        let r = api_sender("CustomerGet", 1)
        r.then(data => {
            customers_set(data.result)
            if (props.customers_update === true) {
                props.set_customers_update(false)
            }
        })
    }, [props.customers_update])
    return (
        <div className="customerlist">
            <div className="customerlist__block">
                <div className="customerlist__top">
                    <h1 className="customerlist__title">{text_content["customers_" + props.lang]}</h1>
                    <div className="customerlist__top-right">
                        <button onClick={() => {props.open_calculation_modal(props.set_new_calculation_modal)}} className="customerlist__btn customerlist__btn_green">{text_content["add_" + props.lang]}</button>
                        <button onClick={(e) => {props.navi_content(e, "handbook_list")}} className="customerlist__btn customerlist__btn_blue">{text_content["back_" + props.lang]}</button>
                    </div>
                </div>
                <div className="customerlist__data">
                    <table className="customerlist__table">
                        <thead className="customerlist__thead">
                        <tr className="customerlist__tr">
                            <th className="customerlist__th customerlist__th-id">ID</th>
                            <th className="customerlist__th customerlist__th-manager">{text_content['name_' + props.lang]}</th>
                            <th className="customerlist__th customerlist__th-edit">{text_content['edit_' + props.lang]}</th>
                            <th className="customerlist__th customerlist__th-delete">{text_content['delete_' + props.lang]}</th>
                        </tr>
                        </thead>
                        <tbody className="customerlist__tbody">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="customerlist__tr">
                                <td className="customerlist__td customerlist__td-id">{customer.id}</td>
                                <td className="customerlist__td customerlist__td-manager">{customer.name}</td>
                                <td className="customerlist__td customerlist__td-edit">
                                    <button onClick={() => {props.open_calculation_modal(props.set_edit_calculation_modal, calculation)}} className="customerlist__td-btn customerlist__td-btn_yellow">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 1000 1000"
                                             className="customerlist__td-img">
                                        <path d="M886.6,742.9c0,103.7-84.3,188-188,188H245.1c-103.7,0-188-84.3-188-188V289.5c0-103.7,84.3-188,188-188h163.8V47.6H245.1
                                            C111.7,47.6,3.2,156.1,3.2,289.5v453.4c0,133.4,108.5,241.9,241.9,241.9h453.4c133.4,0,241.9-108.5,241.9-241.9V579.1h-53.9v163.8
                                            H886.6z"/>
                                        <path d="M956.6,58.6c-28.9-28.9-66.9-43.4-104.9-43.4c-38,0-75.8,14.5-104.9,43.4L227.5,577.9c-21.3,21.3-35.2,49-39.4,78.9
                                            l-24,167.6c-2,14.4,9.2,26.9,23.2,26.9c1.1,0,2.3-0.1,3.4-0.3l167.6-24c29.9-4.3,57.5-18,78.9-39.4l519.3-519.3
                                            C1014.5,210.4,1014.5,116.5,956.6,58.6L956.6,58.6z M290.6,591l439.5-439.5L863.6,285L424.1,724.5L290.6,591z M350.8,773.6
                                            l-127.6,18.2l18.2-127.6c1.8-12,6.1-23.6,12.5-33.7L384.4,761C374.3,767.5,362.8,771.9,350.8,773.6L350.8,773.6z M918.4,230.1
                                            l-16.8,16.8L768.3,113.3l16.8-16.8c17.8-17.8,41.5-27.6,66.8-27.6s49,9.8,66.8,27.6C955.3,133.4,955.3,193.3,918.4,230.1
                                            L918.4,230.1z"/>
                                        </svg>
                                    </button>
                                </td>
                                <td className="customerlist__td customerlist__td-delete">
                                    <button onClick={() => {props.open_calculation_modal(props.set_delete_calculation_modal, calculation)}} className="customerlist__td-btn customerlist__td-btn_red">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 1000 1000"
                                             className="customerlist__td-img">
                                            <path d="M790.1,119.8H634.4C626.7,52.5,569.4,0,500,0c-69.4,0-126.7,52.5-134.4,119.8H209.9c-63,0-114.2,51.3-114.2,114.2v5.9
                                                c0,48.1,30,89.3,72.2,106.1v539.7c0,63,51.2,114.2,114.2,114.2h435.8c63,0,114.2-51.3,114.2-114.2V346
                                                c42.2-16.8,72.2-58,72.2-106.1v-5.9C904.3,171.1,853.1,119.8,790.1,119.8z M500,54.2c39.5,0,72.4,28.3,79.7,65.6H420.3
                                                C427.6,82.5,460.6,54.2,500,54.2z M777.9,885.8c0,33.1-26.9,60.1-60.1,60.1H282.1c-33.1,0-60.1-27-60.1-60.1V354.2h555.9V885.8z
                                                 M850.1,239.9c0,33.1-26.9,60.1-60.1,60.1H209.9c-33.1,0-60.1-26.9-60.1-60.1v-5.9c0-33.1,26.9-60.1,60.1-60.1h580.2
                                                c33.1,0,60.1,26.9,60.1,60.1L850.1,239.9L850.1,239.9z"/>
                                            <path d="M354.8,876.5c15,0,27.1-12.1,27.1-27.1v-305c0-15-12.1-27.1-27.1-27.1c-15,0-27.1,12.1-27.1,27.1v305
                                                C327.7,864.4,339.8,876.5,354.8,876.5z"/>
                                            <path d="M500,876.5c15,0,27.1-12.1,27.1-27.1v-305c0-15-12.1-27.1-27.1-27.1c-15,0-27.1,12.1-27.1,27.1v305
                                                C472.9,864.4,485,876.5,500,876.5z"/>
                                            <path d="M645.2,876.5c15,0,27.1-12.1,27.1-27.1v-305c0-15-12.1-27.1-27.1-27.1c-15,0-27.1,12.1-27.1,27.1v305
                                                C618.1,864.4,630.3,876.5,645.2,876.5z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}