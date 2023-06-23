export interface INewsPageProps {
}

export interface INewsPageState {
    listPost: Array<any>;
    filter: IFilterNews;
    isDataLoading: boolean;
    postPackage: Array<any>;
    isDisableButtonSearch: boolean;
}

export interface IFilterNews {
    NewsType: string;
}
