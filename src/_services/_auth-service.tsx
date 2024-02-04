import { jwtDecode } from "jwt-decode";
import { UserModel } from "../_model/_user-model";
import axiosInstance from "../_global/_axiosInterceptor";

export class AuthenticationService {
    userData?: UserModel;

    get getUserData() {
        if (sessionStorage.getItem("authToken")) {
            const decoded: any = jwtDecode(sessionStorage.getItem("authToken")!);
            // console.log("decoded Token: ", decoded);

            this.userData = {
                exp: decoded.exp,
                iat: decoded.iat,
                isSingleWindowUser: +decoded.isSingleWindowUser,
                iss: decoded.iss,
                userName: decoded.userName,
                nbf: decoded.nbf,
                role: decoded.role,
                roleId: +decoded.roleId,
                userId: +decoded.userId,
                userEmail: decoded.userEmail,
                userMobile: decoded.userMobile,
                officeMappingId: +decoded.officeMappingId

            }
            return this.userData;
        }
        else {
            return undefined;
        }
    }

    login = async (payload: any) => {
        return await axiosInstance.post('/auth/login-organization', payload);
    }
    refreshAuthToken = async (payload: any) => {
        return await axiosInstance.post('/auth/refresh_token', payload);
    }

    // Send OTP

    sendOTPLogin = async (payload: any) => {
        return await axiosInstance.post('/auth/send-otp-client-login', payload);
    }

    // verifying OTP

    verifyingOTP = async (payload: any) => {
        return await axiosInstance.post('/auth/verify-otp-client-login', payload);
    }

    logout = () => {
        sessionStorage.clear();
        window.location.href = '/login';
    }
}

export default AuthenticationService;