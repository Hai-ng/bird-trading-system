import { RouteComponentProps } from "react-router-dom";


export interface IHomePageProps extends RouteComponentProps {
}

export interface IHomePageState {
    listPost: Array<any>;
    listBirdCage: Array<Object>;
    listAccessory: Array<Object>;
    postPackage: Array<any>
    listBanner: Array<any>
}
