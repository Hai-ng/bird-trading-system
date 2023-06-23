import { RouteComponentProps } from "react-router-dom";
import { CommonProps, IUserInfo } from "../CommonComponents/AppInterfaces";

export interface IPostsHistoryProps extends RouteComponentProps, CommonProps {

}

export interface IPostsHistoryState {
    isDataLoading: boolean;
    isDisableButtonSearch: boolean;
    filter: IPostFilter;
    listPost: Array<any>;
    postPackage: Array<any>;
    currentUser: IUserInfo | null;
}

export interface IPostFilter {
    category?: string;
    packageType?: string;
    status?: string;
}