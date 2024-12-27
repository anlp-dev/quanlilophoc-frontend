import {jwtDecode} from 'jwt-decode';
import apiConfig from "../configs/apiConfig.jsx";

const authService = {
    async login(data_req) {
        const username = data_req.get('username')
        const password = data_req.get('password');
        const res = await fetch(`${apiConfig.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        })

        if (!res.ok) {
            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sai tên đăng nhập hoặc mật khẩu');
                } else if (res.status === 404) {
                    throw new Error('Tài khoản không tồn tại');
                }else {
                    const errorData = await res.json(); // Lấy thông tin lỗi chi tiết từ response
                    throw new Error(errorData.message || 'Lỗi server');
                }
            }
        }

        const data = await res.json();
        return data;
    },

    async signup(data_req) {
        try {
            const username = data_req.get('username');
            const password = data_req.get('password');
            const fullname = data_req.get('name');
            const email = data_req.get('email');
            const roleId = data_req.get('roleId');
            const res = await fetch(`${apiConfig.baseUrl}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password, fullname, email, roleId}),
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    },

    async getConfig(){
        try{
            const res = await fetch(`${apiConfig.baseUrl}/auth/config/password`, {
                method: "GET",
            })
            const data = await res.json();
            return data;
        }catch (e) {
            throw new Error(e);
        }
    }
}

export default authService;