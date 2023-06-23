import { NoticeType } from "antd/es/message/interface";
import { RouteComponentProps } from "react-router-dom";
import { IUserInfo } from "../CommonComponents/AppInterfaces";

export interface IUserPageProps extends RouteComponentProps, CommonProps {

}

export interface IUserPageState {
    currentUser: IUserInfo | null;
    oldPassword?: string;
    newPassword?: string;
    isCollapsedSlider: boolean;
    menuKey: string;
    confirmPassword?: string;
}

export interface CommonProps {
    openMessage: (type: NoticeType, message: string, duration?: number, key?: string) => void;
    destroyMessage: (key: string) => void;
}