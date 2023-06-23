import { IBanner } from "./ICreateBanner";
import axios from 'axios';
import { Settings } from "../../services/globalSettings";
import CoreServices from "../../services/data.services";

export default class CreateBannerService extends CoreServices {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
        super();
    }

    // onCreateBannerTransaction(data: IBannerTransaction) {
    //     let url = Settings.BackEndUrl + `/api/v1/banner-transactions`
    //     axios.banner(url, data, {
    //         headers: {
    //             'Authorization': this.auth
    //         }
    //     }).then(res => {

    //     }).catch(error => {

    //     })
    // }

    onCreateBanner(data: IBanner): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/posts`
            axios.post(url, data, {
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

    public onUploadMedia(file: File): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/files?fileExtension=${this.getFileType(file.name)}`;
            let form = new FormData();
            form.append('fileInput', file)
            axios.post(url, form, {
                headers: {
                    'Authorization': this.auth
                }
            }).then(res => {
                resolve({
                    status: true,
                    response: res.data
                })
            }).catch(error => {
                resolve({
                    status: false,
                    response: error
                })
            })
        })
    }

    public getFileType(fileName: string): string {
        let type = '';
        let temp = fileName.split('.');
        type = temp[temp.length - 1];
        return type;
    }
}