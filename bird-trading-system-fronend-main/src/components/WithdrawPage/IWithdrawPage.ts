
import { RouteComponentProps } from "react-router-dom";
import { CommonProps, IUserInfo } from "../CommonComponents/AppInterfaces";

export interface IWithdrawPageProps extends RouteComponentProps, CommonProps {
}

export interface IWithdrawPageState {
    currentStep: number;
    withdraw: number;
    bankName: string;
    bankNumber: string;
    bankUser: string;
    currentUser: IUserInfo | null;
    withdrawCode: string;
    isDisableBtnNext: boolean;
}
