

export interface IBirdPageProps {
}

export interface IBirdPageState {
    listPost: Array<any>;
    filter: IFilterBird;
    isDataLoading: boolean;
    postPackage: Array<any>;
    isDisableButtonSearch: boolean;
}

export interface IFilterBird {
    birdType: string;
    lowestPrice: string;
    highestPrice: string;
    packageType: string;
}
