import apiConfig from "../../configs/apiConfig.jsx";
import axios from "axios";

const LogRequestService = {
    async getRequestsTime(){

    },
    async getRequestsUser(){

    },
    async sendLogRequest(){
        try {
            const hostname = window.location.hostname;
            const ipResponse = await axios.get('https://api.ipify.org?format=json');
            const ip = ipResponse.data.ip;
            const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
            const location = geoResponse.data;

            // Gửi thông tin đến API backend
            await axios.post('http://127.0.0.1:9999/system/log', {
                timestamp: new Date().toISOString(),    
                ip,
                location,
                hostname,
                user: "example_user", // Thay bằng thông tin user thực tế
                endpoint: "/log", // Endpoint hiện tại
                method: "POST", // Phương thức HTTP
            });
            console.log("Log request sent successfully");
        }catch (e) {
            console.error("Failed to send log request", e);
        }
    }
}

export default LogRequestService;