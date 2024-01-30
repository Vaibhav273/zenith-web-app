import axiosInstance from "../_global/_axiosInterceptor";

export class CommonService {

    // Country Code

    getCountryCode = async () => {
        return await axiosInstance.get('/common/get-country-dialing-code-list');
    }
}
export default CommonService;