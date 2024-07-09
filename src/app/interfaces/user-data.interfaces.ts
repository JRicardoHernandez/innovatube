export interface IUser {
    _id?: string,
    user: string,
    name: string,
    lastName: string,
    displayName: string,
    email: string,
    registerDate: Date|null,
    updateDate: Date|null,
    status: boolean,
}

export interface IAuthLogin {
    email: string,
    password: string
}

export interface IAuthRegister {
    email: string,
    password: string
}

export interface IAuthLogout {
    email: string
}

export interface IAuthResetPassword {
    email: string
}

export interface IFavorite {
    _id?: string,
    user: string,
    _id_video: string
}
