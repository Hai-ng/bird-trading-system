import { RouteComponentProps } from "react-router-dom";
import { CommonProps, IUserInfo } from "../CommonComponents/AppInterfaces";
export interface ILoginPageProps extends RouteComponentProps, CommonProps {

}

export interface ILoginPageState {
    email: string;
    password: string;
}