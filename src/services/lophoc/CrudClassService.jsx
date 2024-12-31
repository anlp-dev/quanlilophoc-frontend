import apiConfig from "../../configs/apiConfig.jsx"
import {ERROR} from "../../enums/Message.jsx";
import {jwtDecode} from "jwt-decode";
import {PATH_NAME} from "../../enums/PathAPI.jsx";

const crudClassService = {
    async getAll () {
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error(ERROR.UNAUTHOR)
            }
            const teacherId = jwtDecode(token)
            const res = await fetch(`${apiConfig.baseUrl}/class/${teacherId.userId}`, {
                method: 'GET',
                headers: apiConfig.getAuthHeaders(token),
            })
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.message);
            }
            return data;
        }catch (e) {
            throw new Error(e);
        }
        finally {

        }
    },
    async add (data_req) {
        try{
            console.log(data_req)
            const token = localStorage.getItem("token")
            if(!token){
                throw new Error(ERROR.UNAUTHOR)
            }
            const teacherId = jwtDecode(token)
            const data_class_req = {
                ...data_req,
                teacherId: teacherId.userId,
            }
            const res = await fetch(`${apiConfig.baseUrl}/class/create`, {
                method: 'POST',
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(data_class_req)
            })
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.message);
            }
            return data;
        }catch (e) {
            throw new Error(e.message);
        }finally {

        }
    },
    async update (data_req) {
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error(ERROR.UNAUTHOR)
            }
            const res = await fetch(`${apiConfig.baseUrl}/class/update`, {
                method: 'PUT',
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(data_req)
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
            }
            return data;
        }catch (e) {
            throw new Error(e.message);
        }finally {

        }
    },
    async delete (data_req) {
        try{
            const token = localStorage.getItem("token")
            if(!token){
                throw new Error(ERROR.UNAUTHOR)
            }
            const res = await fetch(`${apiConfig.baseUrl}/class/delete`, {
                method: 'DELETE',
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(data_req)
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
            }
            return data;
        }catch (e) {
            throw new Error(e.message)
        }finally {

        }
    }
}

export default crudClassService;