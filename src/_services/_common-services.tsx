import axiosInstance from "../_global/_axiosInterceptor";

export class CommonService {

    // Country Code

    getCountryCode = async () => {
        return await axiosInstance.get('/common/get-country-dialing-code-list');
    }


    // Gender List

    getGenderList = async () => {
        return await axiosInstance.get('/common/get-gender-list');
    }

    // Referred List

    getReferredList = async () => {
        return await axiosInstance.get('/common/get-referred-by-list');
    }
}
export default CommonService;