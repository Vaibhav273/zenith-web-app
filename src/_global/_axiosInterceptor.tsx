import axios from "axios";
import Swal from "sweetalert2";
import AuthenticationService from "../_services/_auth-service";
// import { baseUrl } from "../env/apiURL";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_baseUrl
    // baseURL: process.env.REACT_APP_baseUrl
});
// Request Interceptor start --------------------------------------------------------------------------------------------------------------------
axiosInstance.interceptors.request.use(
    (config) => {
        const authService = new AuthenticationService();
        if (sessionStorage.getItem("authToken") && sessionStorage.getItem("loginTimeStamp") && config.url!.substring(7, 21) != 'localhost:8800') { // localhost:8800 runs EDS App 
            const loginTime = new Date(+sessionStorage.getItem("loginTimeStamp")!).getTime();
            if ((new Date().getTime() - loginTime) <= (50 * 60 * 1000)) { // Less than equal to 50 minutes
                config.headers.Authorization = `Bearer ${sessionStorage.getItem("authToken")}`;
                // return config;
            }
            else if ((new Date().getTime() - loginTime) > (50 * 60 * 1000) && (new Date().getTime() - loginTime) <= (60 * 60 * 1000)) { // Greater than 50 min and less than equal to 60 min
                refreshAuthToken();
            }
            else { // Greater than 60 minutes
                Swal.fire({
                    html: `Session Timeout !`,
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 2000
                });
                authService.logout();
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
const refreshAuthToken = async () => {
    const authService = new AuthenticationService();
    let payload = {
        authToken: sessionStorage.getItem("authToken"),
        refreshToken: sessionStorage.getItem("refreshToken")
    }
    const res = await authService.refreshAuthToken(payload);
    sessionStorage.setItem('authToken', res.data.authToken);
    sessionStorage.setItem('refreshToken', res.data.refreshToken);
    sessionStorage.setItem('loginTimeStamp', new Date().getTime().toString());
}
// Request Interceptor end --------------------------------------------------------------------------------------------------------------------
// Response Interceptor start --------------------------------------------------------------------------------------------------------------------
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error        
        if (error.response.status === 401) { // 401 = Unauthorized
            console.log(error);
            Swal.fire({
                title: 'Unauthorized !',
                html: error.message,
                icon: 'error',
            });
            const authService = new AuthenticationService();
            authService.logout();
        }
        return Promise.reject(error);
    });
// Response Interceptor end --------------------------------------------------------------------------------------------------------------------

export default axiosInstance;