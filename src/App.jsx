import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import SignUp from "./page/SignUp.jsx";

function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
