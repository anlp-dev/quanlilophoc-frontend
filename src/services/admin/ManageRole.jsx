import apiConfig from "../../configs/apiConfig.jsx";
import {PATH_NAME, PATH_METHOD} from "../../enums/PathAPI.jsx";

const manageRole = {
    async getAllRole() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Bạn không thể truy cập!!!');
            }
            const res = await fetch(`${apiConfig.baseUrl}/role/`, {
                method: 'GET',
                headers: apiConfig.getAuthHeaders(token)
            })
            if (!res.ok) {
                throw new Error(res)
            }
            const data = await res.json();
            return data;
        } catch (e) {
            throw new Error(e);
        }
    },
    async getRolePermission() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Bạn không thể truy cập!!!');
            }
            const res = await fetch(`${apiConfig.baseUrl}/admin/roles`, {
                method: 'GET',
                headers: apiConfig.getAuthHeaders(token)
            })
            if (!res.ok) {
                throw new Error(res)
            }
            const data = await res.json();
            return data.data;
        } catch (e) {
            throw new Error(e);
        }
    },
    async getPermission() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Bạn không thể truy cập!!!")
            }
            const res = await fetch(`${apiConfig.baseUrl}/admin/permissions`, {
                method: 'GET',
                headers: apiConfig.getAuthHeaders(token)
            })
            if (!res.ok) {
                throw new Error(res)
            }
            const data = await res.json();
            return data.data;
        } catch (e) {
            throw new Error(e);
        }
    },
    async saveRole(data){
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error(e);
            }
            const res = await fetch(`${apiConfig.baseUrl}/${PATH_NAME.ADMIN}/${PATH_NAME.ROLE}/save`, {
                method: 'POST',
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(data)
            })
            if(!res.ok){
                throw new Error(e);
            }
        }catch (e) {
            throw new Error(e);
        }
    },
    async savePermission(data) {
        try{
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Bạn không thể truy cập!!!")
            }
            const res = await fetch(`${apiConfig.baseUrl}/${PATH_NAME.ADMIN}/${PATH_METHOD.PERMISSION}/save`,{
                method: 'POST',
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(data)
            })
            if(!res.ok) {
                throw new Error(e);
            }

        }catch(e){
            throw new Error(e);
        }
    },
    async saveRolePermission(data){
        try{
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Bạn không thể truy cập!!!")
            }
            const res = await fetch(`${apiConfig.baseUrl}/${PATH_NAME.ADMIN}/${PATH_NAME.ROLE_PERMISSION}/save`,{
                method: 'POST',
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(data)
            })
            if(!res.ok) {
                throw new Error(e);
            }
        }catch (e) {
            throw new Error(e);
        }
    },
    async removePermission(id){
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("Bạn không thể truy cập!!!")
            }
            const res = await fetch(`${apiConfig.baseUrl}/${PATH_NAME.ADMIN}/${PATH_METHOD.PERMISSION}/${id}/remove`, {
                method: 'DELETE',
                headers: apiConfig.getAuthHeaders(token)
            })
            if(!res.ok) {
                throw new Error(e);
            }
        }catch (e) {
            throw new Error(e);
        }
    }
}

export default manageRole;