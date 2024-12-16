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
                    <Route exact path="/ru/" element={<Main level="home_ru"/>}></Route>
                    <Route exact path="/uz/" element={<Main level="home_uz"/>}></Route>
                    <Route exact path="/auth/" element={<Main level="auth"/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);