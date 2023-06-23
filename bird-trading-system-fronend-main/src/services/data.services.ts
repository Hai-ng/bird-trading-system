import axios from 'axios';
import { listBird, listAccessory, listBirdCage, listNews } from '../assets/dummyData/dummyData';
import { IFilterAccessory } from '../components/AccessoryPage/IAccessoryPage';
import { IFilterBirdCage } from '../components/BirdCagePage/IBirdCagePage';
import { IFilterBird } from '../components/BirdPage/IBirdPage';
import { IUserInfo } from '../components/CommonComponents/AppInterfaces';
import { CommonUtility } from '../utilities/utilities';
import { Settings } from './globalSettings';
import jwt from 'jwt-decode'
import { IFilterNews } from '../components/NewsPage/INewsPage';
import { styleMapping } from '../components/CommonComponents/StyleMapping.enum';

export default class CoreServices {
    constructor() {
        let userToken = JSON.parse(localStorage.getItem('currentUser') as string)?.token;
        if (!CommonUtility.isNullOrEmpty(userToken)) {
            this.auth = `Bearer ${userToken}`
        }
    }

    public auth: string = '';

    public getBirdList(filter: any = null): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }, (error: any) => {
                let dummyData = listBird;
                resolve(dummyData);
            })
        })
    }

    public getMyPost(userId: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/users/${userId}`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((data: any) => {
                resolve({
                    status: true,
                    response: data
                });
            }).catch((error: any) => {
                resolve({
                    status: false,
                    response: error
                });
            })
        })
    }

    public getPostHistoryById(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts/${id}`;
            axios.get(url).then((data: any) => {
                resolve({
                    status: true,
                    response: data
                });
            }).catch((error: any) => {
                resolve({
                    status: false,
                    response: error
                });
            })
        })
    }

    public getPostListBaseOnCategory(categoryId: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts?categoryId=${categoryId}&status=1`;
            axios.get(url).then((data: any) => {
                resolve({
                    status: true,
                    response: data
                });
            }).catch((error: any) => {
                resolve({
                    status: false,
                    response: error
                });
            })
        })
    }

    public getBanner(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts/banner`;
            axios.get(url).then((data: any) => {
                resolve({
                    status: true,
                    response: data
                });
            }).catch((error: any) => {
                resolve({
                    status: false,
                    response: error
                });
            })
        })
    }

    public getBirdById(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts/${id}`;
            axios.get(url).then((data: any) => {
                resolve({
                    status: true,
                    response: data
                });
            }).catch((error: any) => {
                resolve({
                    status: false,
                    response: error
                });
            })
        })
    }

    public getPostPrice(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/packs';
            axios.get(url).then((data: any) => {
                resolve({
                    status: true,
                    response: data.data
                });
            }, (error: any) => {
                resolve({
                    status: false,
                    response: error
                });
            })
        })
    }

    public getBannerPrice(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/packs';
            axios.get(url).then((data: any) => {
                resolve({
                    status: true,
                    response: data.data
                });
            }, (error: any) => {
                resolve({
                    status: false,
                    response: error
                });
            })
        })
    }

    public mappingStylePostPack(arrPacks: Array<any>): Array<any> {
        let mapping = styleMapping;
        arrPacks = arrPacks.filter(item => {
            return item.queue > 1;
        });
        for (let item of arrPacks) {
            item['style'] = (mapping as any)[item['queue']];
        }
        return arrPacks;
    }

    public mappingStyleBannerPack(arrPacks: Array<any>): Array<any> {
        let mapping = styleMapping;
        arrPacks = arrPacks.filter(item => {
            return item.queue === 1;
        });
        for (let item of arrPacks) {
            item['style'] = (mapping as any)[item['queue']];
        }
        return arrPacks;
    }

    public getCategory(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/categories';
            axios.get(url).then((data: any) => {
                resolve({
                    status: true,
                    response: data.data
                });
            }, (error: any) => {
                resolve({
                    status: false,
                    response: error
                });
            })
        })
    }

    public getBirdListOnFilter(filterState: IFilterBird): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }, () => {
                let dummyData = listBird;
                if (!CommonUtility.isNullOrEmpty(filterState?.birdType)) {
                    dummyData = dummyData.filter(item => {
                        return item.type === filterState.birdType;
                    });
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.lowestPrice)) {
                    dummyData = dummyData.filter(item => {
                        return item.price >= Number.parseFloat(filterState.lowestPrice);
                    })
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.highestPrice)) {
                    dummyData = dummyData.filter(item => {
                        return item.price <= Number.parseFloat(filterState.highestPrice);
                    })
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.packageType)) {
                    dummyData = dummyData.filter(item => {
                        return item.packageType === filterState.packageType;
                    })
                }
                resolve(dummyData);
            })
        })
    }

    public getBirdCageList(filter: any): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }, (error: any) => {
                let dummyData = listBirdCage;
                resolve(dummyData);
            })
        })
    }
    public getBirdCageById(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }).catch((error: any) => {
                let dummyData = listBirdCage;
                let birdCage = dummyData.filter(item => {
                    return item.id === id;
                })[0]
                resolve(birdCage);
            })
        })
    }

    public getBirdCageListOnFilter(filterState: IFilterBirdCage): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }, () => {
                let dummyData = listBirdCage;
                if (!CommonUtility.isNullOrEmpty(filterState?.birdCageType)) {
                    dummyData = dummyData.filter(item => {
                        return item.type === filterState.birdCageType;
                    });
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.lowestPrice)) {
                    dummyData = dummyData.filter(item => {
                        return item.price >= Number.parseFloat(filterState.lowestPrice);
                    })
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.highestPrice)) {
                    dummyData = dummyData.filter(item => {
                        return item.price <= Number.parseFloat(filterState.highestPrice);
                    })
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.packageType)) {
                    dummyData = dummyData.filter(item => {
                        return item.packageType === filterState.packageType;
                    })
                }
                resolve(dummyData);
            })
        })
    }

    public getAccessoryList(filter: any): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }, (error: any) => {
                let dummyData = listAccessory;
                resolve(dummyData);
            })
        })
    }
    public getAccessoryById(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }).catch((error: any) => {
                let dummyData = listAccessory;
                let accessory = dummyData.filter(item => {
                    return item.id === id;
                })[0]
                resolve(accessory);
            })
        })
    }

    public getAccessoryListOnFilter(filterState: IFilterAccessory): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }, () => {
                let dummyData = listAccessory;
                if (!CommonUtility.isNullOrEmpty(filterState?.accessoryType)) {
                    dummyData = dummyData.filter(item => {
                        return item.type === filterState.accessoryType;
                    });
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.lowestPrice)) {
                    dummyData = dummyData.filter(item => {
                        return item.price >= Number.parseFloat(filterState.lowestPrice);
                    })
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.highestPrice)) {
                    dummyData = dummyData.filter(item => {
                        return item.price <= Number.parseFloat(filterState.highestPrice);
                    })
                }
                if (!CommonUtility.isNullOrEmpty(filterState?.packageType)) {
                    dummyData = dummyData.filter(item => {
                        return item.packageType === filterState.packageType;
                    })
                }
                resolve(dummyData);
            })
        })
    }

    public onLogin(username: string, password: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/auth/login';
            let datapost = {
                username: username,
                password: password
            }
            axios.post(url, datapost).then((res) => {
                resolve(res);
            }).catch(() => {
                resolve(null)
            })
        })
    }

    public getUserInfor(strToken: string): IUserInfo {
        let jwtInfo: any = jwt(strToken);
        let user: IUserInfo = {
            id: jwtInfo.Id ?? '',
            firstName: jwtInfo.FirstName ?? '',
            lastName: jwtInfo.LastName ?? '',
            token: strToken ?? '',
            username: jwtInfo.Username ?? '',
            email: jwtInfo.Email ?? '',
            role: jwtInfo['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? ''
        }
        return user;
    }

    public getUserInfoById(id: string, token: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/users/${id}`;
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                resolve({
                    status: true,
                    data: res
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    data: error
                })
            })
        })
    }

    public getUserById(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/users/${id}`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res.data
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public getPackById(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/packs/${id}`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res.data
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public registerAccount(dataPost: any): Promise<boolean> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/auth/register';
            axios.post(url, dataPost).then((res) => {
                resolve(true);
            }).catch(() => {
                resolve(false)
            })
        })
    }

    public test(): Promise<boolean> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/classifies';
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve(true);
            }).catch(() => {
                resolve(false)
            })
        })
    }
    public getNewsListOnFilter(filterState: IFilterNews): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }, () => {
                let dummyData = listNews;
                if (!CommonUtility.isNullOrEmpty(filterState?.NewsType)) {
                    dummyData = dummyData.filter(item => {
                        return item.type === filterState.NewsType;
                    });
                }
                resolve(dummyData);
            })
        })
    }
    public getNewsList(filter: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/news';
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((data: any) => {
                resolve(data.data.data);
            }, (error: any) => {
                window.alert("Lỗi nè")
            })
        })
    }
    public getNewsById(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = '';
            axios.get(url).then((data: any) => {
                resolve(data);
            }).catch((error: any) => {
                let dummyData = listNews;
                let news = dummyData.filter(item => {
                    return item.id === id;
                })[0]
                resolve(news);
            })
        })
    }

    public getListTransaction(status: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/transactions?status=${status}`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res.data
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public getTransactionById(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/transactions/${id}`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res.data
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public approveTransaction(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/transactions/ProcessRequest`;
            let dataPost = {
                transactionId: id,
                type: 1
            }
            axios.post(url, dataPost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res.data
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public rejectTransaction(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/transactions/ProcessRequest`;
            let dataPost = {
                transactionId: id,
                type: 0
            }
            axios.post(url, dataPost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res.data
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public sendRequestRecharge(dataPost: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/transactions/MakeRequest';
            axios.post(url, dataPost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public sendRequestWithdraw(dataPost: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/transactions/MakeRequest';
            axios.post(url, dataPost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }
    public changePassword(dataPost: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/auth/change-password';
            axios.post(url, dataPost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public updatePost(dataPost: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/posts';
            axios.put(url, dataPost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public cancelPostTransaction(postTransId: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/post-transactions/IsCancel';
            let dataPost = {
                postTransactionId: postTransId,
                isCancel: true
            }
            axios.put(url, dataPost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public addNewPostTransaction(dataPost: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/post-transactions';
            axios.post(url, dataPost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then((res) => {
                resolve({
                    status: true,
                    response: res
                });
            }).catch((error) => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }
}