export interface AuthResponseModel {
    authToken: string;
    forceChangeEmail: boolean;
    forceChangePassword: boolean;
    isLoginSuccessful: boolean;
    isSingleWindowUser: boolean;
    message: string;
    primaryRole: string;
    refreshToken: string;
    refreshTokenExpiryTime: string;
    userId: number;
    userName: string;
    userRole: number;
}

export interface UserModel {
    exp: number;
    iat: number;
    isSingleWindowUser: number;
    iss: string;
    userName: string;
    nbf: number;
    role: string;
    roleId: number;
    userId: number;
    userEmail: string;
    userMobile: string;
    officeMappingId?: number;  // Only in Deptartment login 
}