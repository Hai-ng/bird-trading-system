/* eslint-disable @typescript-eslint/no-useless-constructor */
import axios from "axios";
import CoreServices from "../../services/data.services";
import { Settings } from "../../services/globalSettings";


export class UserService extends CoreServices {
    constructor() {
        super();
    }


    public getListTransaction(id: string): Promise<any> {
        return new Promise(resolve => {
            let url = Settings.BackEndUrl + `/api/v1/users/${id}`;
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
}