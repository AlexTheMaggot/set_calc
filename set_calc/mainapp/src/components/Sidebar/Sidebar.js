import React from "react";
import "./Sidebar.css";

export default function Sidebar(props) {
    const text_content = {
        "main_ru": "Sidebar Ru",
        "main_uz": "Sidebar Uz",
    }
    return (
        <h1>{props.lang === "ru" ? text_content.main_ru : text_content.main_uz}</h1>
    )
}