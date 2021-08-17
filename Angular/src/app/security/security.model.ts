export interface userCredentials {
    email: string;
    password: string;
    displayname: string;
    gender: string;
    profileImageUrl: string;
}

export interface userLogin {
    email: string;
    password: string;
}

export interface userChangePassword {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface userInfo {
    id: string;
    displayName: string;
    email: string;
    gender: string;
    profileImageURL: string;
}

export interface userAddress {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    street: string;
    city: string;
    ward: string;
    district: string;
}

export interface userAddressCreation {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    street: string;
    city: string;
    ward: string;
    district: string;
}

export interface authenticationResponse {
    token: string;
    expiration: Date;
}