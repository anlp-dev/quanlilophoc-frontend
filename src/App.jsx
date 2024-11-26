import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import SignUp from "./page/SignUp.jsx";
import SideMenu from "./components/layouts/SideMenu.jsx";
import PrivateRoute from "./security/PrivateRoute.jsx";
import Profile from "./page/Profile.jsx";
import Main from "./page/Main.jsx";
import Class from "./page/Class.jsx";
import Dashboard from "./page/Dashboard.jsx";
import NotFoundPage from "./page/404.jsx";
import AccessDeniedPage from "./page/403.jsx";
import Account from "./page/Account.jsx";

function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<Login />} />


                    <Route element={<PrivateRoute />}>
                        <Route path="/404" element={<NotFoundPage/>}/>
                        <Route path="/403" element={<AccessDeniedPage/>}/>
                        <Route element={<Main />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/class" element={<Class/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/settings/account" element={<Account />}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
