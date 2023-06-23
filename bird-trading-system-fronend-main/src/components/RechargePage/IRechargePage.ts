
import { RouteComponentProps } from "react-router-dom";
import { CommonProps, IUserInfo } from "../CommonComponents/AppInterfaces";

export interface IRechargePageProps extends RouteComponentProps, CommonProps {
}

export interface IRechargePageState {
    currentStep: number;
    recharge: number;
    currentUser: IUserInfo | null;
    rechargeCode: string;
    isDisableBtnNext: boolean;
}
