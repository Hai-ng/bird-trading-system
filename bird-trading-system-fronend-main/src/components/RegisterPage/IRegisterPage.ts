import { NoticeType } from "antd/es/message/interface";
import { RouteComponentProps } from "react-router-dom";

export interface IRegisterPageState {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    passwordConfirm: string;
    address: string;
}

export interface IRegisterPageProps extends RouteComponentProps {
    openMessage: (type: NoticeType, message: string, duration?: number, key?: string) => void;
    destroyMessage: (key: string) => void;
}