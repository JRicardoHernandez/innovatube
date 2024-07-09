export interface ILoginResponse {
    message: string,
    userCredential: {
        user: {
            uid: string,
            email: string,
            emailVerified: false,
            isAnonymous: false,
            providerData: IProviderData[],
            stsTokenManager: {
                refreshToken: string,
                accessToken: string,
                expirationTime: number
            },
            createdAt: string,
            lastLoginAt: string,
            apiKey: string,
            appName: string
        },
        providerId: null,
        _tokenResponse: {
            kind: string,
            localId: string,
            email: string,
            displayName: string,
            idToken: string,
            registered: true,
            refreshToken: string,
            expiresIn: number
        },
        operationType: string
    }
}

interface IProviderData {
    providerId: string,
    uid: string,
    displayName: string,
    email: string,
    phoneNumber: string,
    photoURL: string
}

export interface IRegisterResponse {
    message: string
}

export interface ILogoutResponse {
    message: string
}

export interface IResetPasswordResponse {
    message: string
}

