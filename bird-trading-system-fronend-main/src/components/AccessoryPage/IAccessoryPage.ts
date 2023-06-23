

export interface IAccessoryPageProps {
}

export interface IAccessoryPageState {
    listPost: Array<any>;
    filter: IFilterAccessory;
    isDataLoading: boolean;
    postPackage: Array<any>;
    isDisableButtonSearch: boolean;
}

export interface IFilterAccessory {
    accessoryType: string;
    lowestPrice: string;
    highestPrice: string;
    packageType: string;
}
