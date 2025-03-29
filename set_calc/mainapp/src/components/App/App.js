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
                    <Route exact path="/calculations/" element={<Main level="calculation_list"/>}></Route>
                    <Route exact path="/coefficients/" element={<Main level="coefficient_list"/>}></Route>
                    <Route exact path="/handbooks/" element={<Main level="handbook_list"/>}></Route>
                    <Route exact path="/handbooks/customers/" element={<Main level="customer_list"/>}></Route>
                    <Route exact path="/auth/" element={<Main level="auth"/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);