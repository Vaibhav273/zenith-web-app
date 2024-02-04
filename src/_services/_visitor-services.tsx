import axiosInstance from "../_global/_axiosInterceptor";

export class VisitorServices {

    updateVisitorProfile = async (payload: any) => {
        return await axiosInstance.post('/visitor/update-visitor-profile', payload);
    }

}
export default VisitorServices;