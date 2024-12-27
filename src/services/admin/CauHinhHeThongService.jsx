import apiConfig from "../../configs/apiConfig.jsx";
import axios from "axios";

const CauHinhHeThongService = {
    async get(){
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error('Invalid token !!!!!');
            }
            const res = await fetch(`${apiConfig.baseUrl}/system/config/password`, {
                method: "GET",
                headers: apiConfig.getAuthHeaders(token)
            })
            const data = await res.json();
            return data;
        }catch (e) {
            throw new Error(e);
        }
    },
    async update(data){
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error(e);
            }
            const res = await fetch(`${apiConfig.baseUrl}/system/config/password`, {
                method: "POST",
                headers: apiConfig.getAuthHeaders(token),
                body: JSON.stringify(data)
            })
            await res.json();
        }catch (e) {

        }
    }

}

export default CauHinhHeThongService;