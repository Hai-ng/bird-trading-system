/* eslint-disable @typescript-eslint/no-useless-constructor */
import axios from "axios";
import CoreServices from "../../services/data.services";
import { Settings } from "../../services/globalSettings";
import { styleMapping } from "../CommonComponents/StyleMapping.enum";


export class AdminService extends CoreServices {
    constructor() {
        super();
    }

    public getListPostRequested(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts/process`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then(res => {
                resolve({
                    status: true,
                    response: res
                })
            }).catch(err => {
                resolve({
                    status: false,
                    response: err
                })
            })
        })
        
    }

    public getListPost(endpoint: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `${endpoint}`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then(res => {
                resolve({
                    status: true,
                    response: res
                })
            }).catch(err => {
                resolve({
                    status: false,
                    response: err
                })
            })
        })
        
    }

    public getPostDetail(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts/${id}`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then(res => {
                resolve({
                    status: true,
                    response: res
                })
            }).catch(err => {
                resolve({
                    status: false,
                    response: err
                })
            })
        })
    }

    public getListAllUser(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/users`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then(res => {
                resolve({
                    status: true,
                    response: res
                })
            }).catch(error => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public getListPostApproved(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts`;
            axios.get(url, {
                headers: {
                    'Authorization': this.auth
                }
            }).then(res => {
                resolve({
                    status: true,
                    response: res
                })
            }).catch(error => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public onApprovePost(postId: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts/ProcessRequest`;
            let datapost = {
                postId: postId,
                type: 1
            }
            axios.post(url, datapost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then(res => {
                resolve({
                    status: true,
                    response: res
                })
            }).catch(error => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public onRejectPost(postId: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts/ProcessRequest`;
            let datapost = {
                postId: postId,
                type: 0
            }
            axios.post(url, datapost, {
                headers: {
                    'Authorization': this.auth
                }
            }).then(res => {
                resolve({
                    status: true,
                    response: res
                })
            }).catch(error => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public getListUser(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/users`;
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

    public getListCategory(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/categories`;
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

    public createCategory(dataPost: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/categories';
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

    public getListPack(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/packs`;
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

    public mappingStylePack(arrPacks: Array<any>): Array<any> {
        let mapping = styleMapping;
        for (let item of arrPacks) {
            item['style'] = (mapping as any)[item['queue']];
        }
        return arrPacks;
    }

    public createPack(dataPost: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + 'api/v1/packs';
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

    public createPackPrice(dataPost: any): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + '/api/v1/pack-prices';
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

    public updatePackageInfo(dataPost: any, packId: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/packs?id=${packId}`;
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

    public getPackPrice(): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/pack-prices`;
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

    public getReportPostThisMonth(): Promise<any> {
        return new Promise(resolve => {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let url = Settings.BackEndUrl + `/api/v1/reports/GetPostByMonth?year=${year}&month=${month}`;
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

    public getReportTransactionThisMonth(): Promise<any> {
        return new Promise(resolve => {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let url = Settings.BackEndUrl + `/api/v1/reports/GetTransactionByMonth?year=${year}&month=${month}`;
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

    public getReportPostTransactionThisMonth(): Promise<any> {
        return new Promise(resolve => {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let url = Settings.BackEndUrl + `/api/v1/reports/GetPostTransactionByMonth?year=${year}&month=${month}`;
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

    public getPostByDate(from: string, to: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/reports/GetPostByDay?startDate=${from}&endDate=${to}`;
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

    public getPostTransactionByDate(from: string, to: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/reports/GetPostTransactionByDay?startDate=${from}&endDate=${to}`;
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
}