import { NoticeType } from "antd/es/message/interface";

export interface IUserInfo {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    avatar?: string;
    username: string;
    email?: string;
    id: string | null;
    token: string | null;
    role: string;
    address?: string;
    balance?: number;
}

export interface CommonProps {
    openMessage: (type: NoticeType, message: string, duration?: number, key?: string) => void;
    destroyMessage: (key: string) => void;
}