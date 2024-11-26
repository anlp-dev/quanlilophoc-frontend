import apiConfig from "../configs/apiConfig.jsx";
import {jwtDecode} from 'jwt-decode';

const userService = {
    async loadDataUser(token) {
        try {
            const token_decode = jwtDecode(token);
            const res = await fetch(`${apiConfig.baseUrl}/auth/account/${token_decode.userId}`, {
                method: 'GET',
                headers: apiConfig.getAuthHeaders(token)
            });

            if (!res.ok) {

                const errorData = await res.json(); // Hoặc res.text() tùy theo response
                console.error("Lỗi server:", errorData);

            }
            const data = await res.json();
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    async updateUser(data, id) {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${apiConfig.baseUrl}/account/${id}`, {
                method: 'PUT',
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(data)
            })
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default userService;