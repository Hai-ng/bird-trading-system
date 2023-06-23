

export interface IBirdCagePageProps {
}

export interface IBirdCagePageState {
    listPost: Array<any>;
    filter: IFilterBirdCage;
    isDataLoading: boolean;
    postPackage: Array<any>;
    isDisableButtonSearch: boolean;
}

export interface IFilterBirdCage {
    birdCageType: string;
    lowestPrice: string;
    highestPrice: string;
    packageType: string;
}
