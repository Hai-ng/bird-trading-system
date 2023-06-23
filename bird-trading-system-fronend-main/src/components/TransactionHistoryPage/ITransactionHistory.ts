import { RouteComponentProps } from "react-router-dom";
import { CommonProps, IUserInfo } from "../CommonComponents/AppInterfaces";
import { IPostTransaction } from "../CreatePostPage/ICreatePost";

export interface ITransactionHistoryPageProps extends RouteComponentProps, CommonProps {
    
}

export interface ITransactionHistoryPageState {
    currentUser: IUserInfo | null;
    isCollapsedSlider: boolean;
    menuKey: string;
    filter : IPostTransactionFilter;
    listTransaction: Array<any>;
}
export interface IPostTransactionFilter {
    status? : string;
}

