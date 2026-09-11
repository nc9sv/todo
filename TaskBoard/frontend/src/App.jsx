import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FormCard from "./components/Card.jsx";
import ToDoContainer from "./components/ToDoContainer.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormCard/>}/>
                <Route path="/tasks" element={<ToDoContainer/>}/>
            </Routes>
        </Router>
    )
}

export default App
