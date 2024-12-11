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
import Account from "./components/Profile/Account.jsx";
import QuanTriNguoiDung from "./components/admin/QuanTriNguoiDung.jsx";
import QuanTriVaiTro from "./components/admin/QuanTriVaiTro.jsx";
import Admin from "./page/admin/Admin.jsx";
import RequestStatistics from "./components/admin/ThongKeLuotRequest.jsx";
import StatisticsReports from "./components/admin/ThongKe.jsx";
import CauHinhHeThong from "./components/admin/CauHinhHeThong.jsx";
import KiemSoatHeThong from "./components/admin/KiemSoatHeThong.jsx";
import QuanLyQuyenTruyCap from "./components/admin/QuanLyQuyenTruyCap.jsx";
import BaoTri from "./components/admin/BaoTri.jsx";
import BaoMat from "./components/admin/BaoMat.jsx";

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
                            <Route path="/admin" element={<Admin/>}>
                                <Route path="user" element={<QuanTriNguoiDung/>}/>
                                <Route path="roles" element={<QuanTriVaiTro/>}/>
                                <Route path="request" element={<RequestStatistics/>}/>
                                <Route path="report" element={<StatisticsReports/>}/>
                                <Route path="config" element={<CauHinhHeThong/>}/>
                                <Route path="control" element={<KiemSoatHeThong/>}/>
                                <Route path="manage-request" element={<QuanLyQuyenTruyCap/>}/>
                                <Route path="safe" element={<BaoTri/>}/>
                                <Route path="security" element={<BaoMat/>}/>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
