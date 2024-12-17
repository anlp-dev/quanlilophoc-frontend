import {jwtDecode} from 'jwt-decode';
import apiConfig from "../../configs/apiConfig.jsx";

const userByAdminService = {
    async getAllUsers(){
        try {
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error('Bạn không thể truy cập!!!');
            }
            const res = await fetch(`${apiConfig.baseUrl}/system/user`, {
                method: 'GET',
                headers: apiConfig.getAuthHeaders(token)
            })
            if(!res.ok){
                throw new Error(res)
            }
            const data = await res.json();
            return data;
        }   catch (e) {
            throw new Error(e);
        }     
    }
}

export default userByAdminService;