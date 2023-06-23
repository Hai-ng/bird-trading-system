import { Button, Col, Divider, Layout, Row, Tabs, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import moment from 'moment';
import { NumericFormat } from "react-number-format";
import { TransStatusMapping, TransStatusMappingStyle } from '../TransactionHistoryPage/Mapping Data/TransactionStatusMapping';
// import { TransactionDetail } from "../TransactionHistoryPage/TransactionsHistoryDetails";
import { CommonProps, IUserInfo } from "../CommonComponents/AppInterfaces";
import { PaymentTypeMapping, PaymentTypeMappingStyle } from "../TransactionHistoryPage/Mapping Data/PaymentTypeMapping";
import { FormOutlined } from '@ant-design/icons';
import { UserService } from "./UserService";
import { CommonUtility } from "../../utilities/utilities";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";

interface ITransactionHistoryState {
    activeTabs: string;
    currentUser: IUserInfo | null;
    listTransaction: Array<any>;
}


interface ITransactionHistoryProps extends CommonProps {

}

interface ITransaction {
    createDate: string;
    money: number;
    paymentType: string;
    isMinus: boolean;
}

export class TransactionHistory extends React.Component<ITransactionHistoryProps, ITransactionHistoryState> {
    public userService = new UserService();
    constructor(props: ITransactionHistoryProps) {
        super(props);
        this.state = {
            activeTabs: 'requested',
            currentUser: null,
            listTransaction: [],
        }
    }

    componentDidMount(): void {
        let user = localStorage.getItem('currentUser');
        if (CommonUtility.isNullOrUndefined(user)) {
            CommonUtility.redirectTo('/login');
        } else {
            let objUser = JSON.parse(user as string);
            this.setState({
                currentUser: objUser,
            });
            this.getDataSource(objUser?.id);
        }
    }

    render(): React.ReactNode {
        return (
            this.state.currentUser ?
                <div>
                    <HeaderTemplate activeTab={0}></HeaderTemplate>
                    <div className="App-body-contain">
                        <div style={{ padding: 10 }}></div>
                        <Row justify={'center'}>
                            <Col span={20}>
                                <Layout.Content style={{ display: 'flex', alignItems: 'center', flexDirection:'column' }}>
                                    <Divider className="divider-title" orientation="left">Lịch sử giao dịch</Divider>
                                    {this.renderHistory()}
                                </Layout.Content>
                            </Col>
                        </Row>
                    </div>
                    <FooterTemplate></FooterTemplate>
                </div>
                : <></>
        )
    }

    private renderHistory(): React.ReactNode {
        let elemNode: React.ReactNode[] = [];
        let trans = this.state.listTransaction;
        trans.map((data, index) => {
            elemNode.push(
                <Col key={`trans_${index}`} span={24} style={{ width: '100%', margin: 14 }}>
                    <div style={{
                        boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
                        padding: 15
                    }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ marginBottom: 5 }}>Loại giao dịch: <strong>{data.paymentType}</strong></span>
                            <span>Số tiền giao dịch: 
                                <Tag style={{ marginLeft: 10 }} color={data.isMinus ? 'error' : 'success'} >
                                    {data.isMinus ? '-' : '+'} <NumericFormat style={{ fontWeight: 700 }} thousandSeparator=',' value={data.money} displayType='text' suffix=" ₫" />
                                </Tag>
                            </span>
                            <span>ngày giao dịch: {moment(data.createDate).format('DD/MM/yyy HH:mm A')}</span>
                            {/* <Button
                                style={{ margin: '10px 24px 0px 32px', backgroundColor: 'gray' }}
                                type="primary"
                                onClick={() => { this.goToPostHistoryDetail(data['id']) }}>
                                Xem chi tiết
                            </Button> */}
                        </div>
                    </div>
                </Col>
            )
        })
        return <>{elemNode}</>
    }

    private getDataSource(userId: string): void {
        this.userService.getUserById(userId).then(res => {
            if (res.status) {
                let _data = this.formatTransactionList(res.response.data).sort((a, b) => {
                    if (a.createDate < b.createDate) {
                        return 1
                    } else {
                        return -1
                    }
                })
                this.setState({
                    listTransaction: _data
                })
            }
        });
    }

    private formatTransactionList(data: any): Array<any> {
        let arrTransaction = data.transactions.filter((item: any) => {
            return item.status === 1;
        });
        let activePost = data.posts.filter((item: any) => {
            return item.status === 1;
        })
        let arrPostTransaction: any[] = [];
        for (let post of activePost) {
            arrPostTransaction = arrPostTransaction.concat(post.postTransactions);
        }
        let formatTrans = this.updateTransactionArray(arrTransaction);
        let formatPostTrans = this.updatePostTransactionArray(arrPostTransaction);
        return formatTrans.concat(formatPostTrans);
    }

    private updateTransactionArray(arr: any): Array<ITransaction> {
        let result: ITransaction[] = [];
        for (let item of arr) {
            result.push({
                createDate: item.createDate,
                money: item.money,
                paymentType: item.paymentType === 1 ? 'Nạp tiền' : 'Rút tiền',
                isMinus: item.paymentType === 1 ? false : true
            })
        }
        return result;
    }

    private updatePostTransactionArray(arr: any): Array<ITransaction> {
        let result: ITransaction[] = [];
        for (let item of arr) {
            result.push({
                createDate: item.createDate,
                money: item.price,
                paymentType: `Phí sử dụng gói ${item.packs.title} (${item.expiredDay} ngày)`,
                isMinus: true
            })
        }
        return result;
    }
}