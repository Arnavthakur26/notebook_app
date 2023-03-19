import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";
import Topbar from "./components/Topbar";
import Login from "./components/Login";
import NoteState from "./context/notes/NoteState";
import FilterState from "./context/filter/FilterState";
import UserState from "./context/user/UserState";
import SignUp from "./components/SignUp";

export const App = () => {
  return (
    <>
      <UserState>
        <NoteState>
          <FilterState>
            <Router>
              <Topbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Home />
                      <Sidebar />
                    </>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </Router>
          </FilterState>
        </NoteState>
      </UserState>
    </>
  );
};

export default App;
