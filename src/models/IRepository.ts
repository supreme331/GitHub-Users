import {IUser} from "./IUser";

export interface IRepository {
    id: number;
    name: string;
    owner: IUser;
    html_url: string;
    description: string | null;
    language: string | null;
    fork: boolean;
    updated_at: string | number | Date;
}