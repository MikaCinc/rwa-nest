export interface IUser {
    id: number;
    username: string;
    email: string;
    password?: string;
    dateCreated: Date;
    dateUpdated: Date;
};

export interface IUserToken {
    user: IUser;
    access_token: string;
}