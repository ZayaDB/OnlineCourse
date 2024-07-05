import React from "react";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";
import LoginRegister from "./components/login/LoginRegister";
import "./styles/index.css";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<LoginRegister />}></Route>
          <Route path="/header" element={<Header />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
