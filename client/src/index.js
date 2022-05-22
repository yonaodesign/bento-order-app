import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import { Provider } from 'react-redux'
import { store } from './app/store'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<App />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Login />}></Route> 
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
