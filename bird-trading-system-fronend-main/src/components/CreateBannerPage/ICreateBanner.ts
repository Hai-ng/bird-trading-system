import { NoticeType } from "antd/es/message/interface";
import { RouteComponentProps } from "react-router-dom";
import { IUserInfo } from "../CommonComponents/AppInterfaces";

export interface ICreateBannerPageProps extends RouteComponentProps {
    openMessage: (type: NoticeType, message: string, duration?: number, key?: string) => void;
    destroyMessage: (key: string) => void;
}

export interface ICreateBannerPageState {
    currentUser: IUserInfo | null;
    bannerPackage: Array<any>;
    categories: Array<any>;

    title: string;
    productType: string;
    description?: string;
    packageId: string;
    bannerRangeDate: number;
    bannerId?: string;
    bannerDate: Date | null;
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

export interface IBanner {
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