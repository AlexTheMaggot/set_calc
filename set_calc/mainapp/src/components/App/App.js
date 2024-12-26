import React from "react";
import {createRoot} from "react-dom/client";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "../Main/Main";
export default function App(props) {
    return (
        <div className="app">
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    <Route exact path="/" element={<Main level="home"/>}></Route>
                    <Route exact path="/ru/calculations/" element={<Main level="calculation_list_ru"/>}></Route>
                    <Route exact path="/ru/coefficients/" element={<Main level="coefficient_list_ru"/>}></Route>
                    <Route exact path="/ru/handbooks/" element={<Main level="handbook_list_ru"/>}></Route>
                    <Route exact path="/uz/calculations/" element={<Main level="calculation_list_uz"/>}></Route>
                    <Route exact path="/uz/coefficients/" element={<Main level="coefficient_list_uz"/>}></Route>
                    <Route exact path="/uz/handbooks/" element={<Main level="handbook_list_uz"/>}></Route>
                    <Route exact path="/auth/" element={<Main level="auth"/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);