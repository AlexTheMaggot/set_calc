import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import "./Main.css";
import Auth from "../Auth/Auth";
import NewCalculation from "../NewCalculation/NewCalculation";
import CalculationList from "../CalculationList/CalculationList";
import EditCalculation from "../EditCalculation/EditCalculation";
import DeleteCalculation from "../DeleteCalculation/DeleteCalculation";
import CoefficientList from "../CoefficientList/CoefficientList";
import HandbookList from "../HandbookList/HandbookList";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import CustomerList from "../CustomerList/CustomerList";
import NewCustomer from "../NewCustomer/NewCustomer";
import EditCustomer from "../EditCustomer/EditCustomer";
import DeleteCustomer from "../DeleteCustomer/DeleteCustomer";
import api_sender from "../api_sender";


export default function Main(props) {
    let [lang, set_lang] = useState("ru");
    let [navigate, set_navigate] = useState("");
    let [main_show, set_main_show] = useState(true);
    let [main_content_show, set_main_content_show] = useState(true);
    let [auth, set_auth] = useState(false);
    let [sidebar_show, set_sidebar_show] = useState(false);
    let [header_show, set_header_show] = useState(false);
    let [profile, set_profile] = useState({})
    let [modal_object, set_modal_object] = useState({})
    let [new_calculation_modal, set_new_calculation_modal] = useState({
        wrapper: {show: false, appear: false}, block: {show: false, appear: false}
    })
    let [edit_calculation_modal, set_edit_calculation_modal] = useState({
        wrapper: {show: false, appear: false}, block: {show: false, appear: false}
    })
    let [delete_calculation_modal, set_delete_calculation_modal] = useState({
        wrapper: {show: false, appear: false}, block: {show: false, appear: false}
    })
    let [calculations_update, set_calculations_update] = useState(false)
    let [new_customer_modal, set_new_customer_modal] = useState({
        wrapper: {show: false, appear: false}, block: {show: false, appear: false}
    })
    let [edit_customer_modal, set_edit_customer_modal] = useState({
        wrapper: {show: false, appear: false}, block: {show: false, appear: false}
    })
    let [delete_customer_modal, set_delete_customer_modal] = useState({
        wrapper: {show: false, appear: false}, block: {show: false, appear: false}
    })
    let [customers_update, set_customers_update] = useState(false)
    let header_levels = [
        "calculation_list",
        "coefficient_list",
        "handbook_list",
        "customer_list",
    ];
    let auth_checker = () => {
        if (auth === false) {
            let response = api_sender("AuthCheck", 1)
            response.then((data) => {
                if (data.result === false) {
                    if (location.pathname !== "/auth/") {
                        set_navigate("auth")
                    }
                }
                else {
                    set_auth(true)
                    let r_1 = api_sender("LangCheck", 1)
                    r_1.then(data => {
                        set_lang(data.result)
                        if ( props.level.slice(-2) !== data.result ) {
                            set_navigate(props.level.slice(0, -2) + data.result)
                        }
                        if (location.pathname === "/") {
                            set_navigate("calculation_list");
                        }
                    })
                    let r_2 = api_sender("ProfileGet", 1)
                    r_2.then(data => {
                        set_profile(data.result)
                    })
                }
            })
        }
    }
    let navi = (e, level) => {
        e.preventDefault();
        set_main_show(false);
        setTimeout(() => {
            set_navigate(level);
        }, 300);
        setTimeout(() => {
            set_main_show(true);
        }, 600);
    }
    let navi_content = (e, level) => {
        e.preventDefault();
        set_main_content_show(false);
        setTimeout(() => {
            set_navigate(level);
        }, 300);
        setTimeout(() => {
            set_main_content_show(true);
        }, 600);
    }
    let open_modal = (set_state, obj = null) => {
        if (obj != null) {
            set_modal_object(obj)
        }
        set_state({ wrapper: {show: true, appear: false}, block: {show: false, appear: false}})
        setTimeout(() => {
            set_state({ wrapper: {show: true, appear: true}, block: {show: true, appear: false}})
        })
        setTimeout(() => {
            set_state({ wrapper: {show: true, appear: true}, block: {show: true, appear: true}})
        }, 300)
    }
    let close_modal = (set_state) => {
        set_state({ wrapper: {show: true, appear: true}, block: {show: true, appear: false}})
        setTimeout(() => {
            set_state({ wrapper: {show: true, appear: false}, block: {show: false, appear: false}})
        }, 300)
        setTimeout(() => {
            set_state({ wrapper: {show: false, appear: false}, block: {show: false, appear: false}})
        }, 600)
    }
    useEffect(() => {
        auth_checker();
        if (header_levels.includes(props.level)) {
            set_sidebar_show(true);
            set_header_show(true);
        }
        else {
            set_sidebar_show(false);
            set_header_show(false);
        }
        set_navigate("");
    });
    return (
            <div className={main_show ? "main" : "main main_hidden"}>
                <div className={sidebar_show ? "main__sidebar" : "main__sidebar main__sidebar_none"}>
                    <Sidebar lang={lang} navi={navi_content} profile={profile} />
                </div>
                <div className="main__header-content">
                    <div className={header_show ? "main__header" : "main__header main__header_none"}>
                        <Header navi={navi} lang={lang} set_lang={set_lang} />
                    </div>
                    <div className={main_content_show ? "main__content" : "main__content main__content_hidden"}>
                        {navigate === "auth" && <Navigate to="/auth/" />}
                        {navigate === "calculation_list" && <Navigate to="/calculations/" />}
                        {navigate === "coefficient_list" && <Navigate to="/coefficients/" />}
                        {navigate === "handbook_list" && <Navigate to="/handbooks/" />}
                        {navigate === "customer_list" && <Navigate to="/handbooks/customers/" />}
                        {props.level === "auth" && <Auth
                            navi={navi} lang={lang} set_lang={set_lang}
                        />}
                        {props.level === "calculation_list" && <CalculationList
                            lang={lang}
                            open_modal={open_modal}
                            set_new_calculation_modal={set_new_calculation_modal}
                            set_edit_calculation_modal={set_edit_calculation_modal}
                            set_delete_calculation_modal={set_delete_calculation_modal}
                            calculations_update={calculations_update}
                            set_calculations_update={set_calculations_update}
                        />}
                        {props.level === "coefficient_list" && <CoefficientList
                            lang={lang}
                        />}
                        {props.level === "handbook_list" && <HandbookList
                            lang={lang}
                            navi_content={navi_content}
                        />}
                        {props.level === "customer_list" && <CustomerList
                            lang={lang}
                            open_modal={open_modal}
                            set_new_customer_modal={set_new_customer_modal}
                            set_edit_customer_modal={set_edit_customer_modal}
                            set_delete_customer_modal={set_delete_customer_modal}
                            customers_update={customers_update}
                            set_customers_update={set_customers_update}
                            navi_content={navi_content}
                        />}
                    </div>
                </div>
                {new_calculation_modal.wrapper.show && (
                    <NewCalculation
                        lang={lang}
                        close_modal={close_modal}
                        new_calculation_modal={new_calculation_modal}
                        set_new_calculation_modal={set_new_calculation_modal}
                        set_calculations_update={set_calculations_update}
                    />
                )}
                {delete_calculation_modal.wrapper.show && (
                    <DeleteCalculation
                        lang={lang}
                        close_modal={close_modal}
                        delete_calculation_modal={delete_calculation_modal}
                        set_delete_calculation_modal={set_delete_calculation_modal}
                        set_calculations_update={set_calculations_update}
                        calculation={modal_object}
                    />
                )}
                {edit_calculation_modal.wrapper.show && (
                    <EditCalculation
                        lang={lang}
                        close_modal={close_modal}
                        edit_calculation_modal={edit_calculation_modal}
                        set_edit_calculation_modal={set_edit_calculation_modal}
                        set_calculations_update={set_calculations_update}
                        calculation={modal_object}
                    />
                )}
                {new_customer_modal.wrapper.show && (
                    <NewCustomer
                        lang={lang}
                        close_modal={close_modal}
                        new_customer_modal={new_customer_modal}
                        set_new_customer_modal={set_new_customer_modal}
                        set_customers_update={set_customers_update}
                    />
                )}
                {delete_customer_modal.wrapper.show && (
                    <DeleteCustomer
                        lang={lang}
                        close_modal={close_modal}
                        delete_customer_modal={delete_customer_modal}
                        set_delete_customer_modal={set_delete_customer_modal}
                        set_customers_update={set_customers_update}
                        customer={modal_object}
                    />
                )}
                {edit_customer_modal.wrapper.show && (
                    <EditCustomer
                        lang={lang}
                        close_modal={close_modal}
                        edit_customer_modal={edit_customer_modal}
                        set_edit_customer_modal={set_edit_customer_modal}
                        set_customers_update={set_customers_update}
                        customer={modal_object}
                    />
                )}
            </div>
        );
}