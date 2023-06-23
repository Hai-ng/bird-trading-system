import { NoticeType } from "antd/es/message/interface";
import { RouteComponentProps } from "react-router-dom";
import { IUserInfo } from "../CommonComponents/AppInterfaces";

export interface ICreatePostPageProps extends RouteComponentProps {
    openMessage: (type: NoticeType, message: string, duration?: number, key?: string) => void;
    destroyMessage: (key: string) => void;
}

export interface ICreatePostPageState {
    currentUser: IUserInfo | null;
    postPackage: Array<any>;
    categories: Array<any>;

    title: string;
    productType: string;
    description?: string;
    packageId: string;
    postingRangeDate: number;
    bannerId?: string;
    postingDate: Date | null;
    address: string;
    images: any[];
    isAcceptPolicy: boolean;
    nameSeller: string;
    phoneSeller: string;
    productPrice: number;

    unitPrice: number;
    intoMoney: number;

    isDisableButtonCreate: boolean;
    isShowPopupRule: boolean;
    isPreviewImage: boolean;
    sourceImagePreview: string;
}

export interface IPostTransaction {
    price: number;
    packId: string;
    postId?: string;
    expiredDay: number;
    effectDate: string;
}

export interface IPost {
    title: string;
    description?: string;
    address: string;
    price: number;
    phoneSeller: string;
    nameSeller: string;
    categoryId: string;
    userId: string;
    medias: Array<IMedia>;
    postTransaction: IPostTransaction;
}

export interface IMedia {
    url: string;
    extension: string;
}