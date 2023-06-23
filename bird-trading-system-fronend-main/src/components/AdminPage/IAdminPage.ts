import { RouteComponentProps } from "react-router-dom";
import { CommonProps, IUserInfo } from "../CommonComponents/AppInterfaces";

export interface IAdminPageProps extends RouteComponentProps, CommonProps {
    
}

export interface IAdminPageState {
    currentUser: IUserInfo | null;
    isCollapsedSlider: boolean;
    menuKey: string;
}