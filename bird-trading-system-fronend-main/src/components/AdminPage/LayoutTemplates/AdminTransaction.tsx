import { Button, Col, Row, Table, Tabs, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import moment from 'moment';
import { NumericFormat } from "react-number-format";
import { TransStatusMapping, TransStatusMappingStyle } from '../MappingData/TransactionStatusMapping';
import { TransactionDetail } from "../DialogTemplates/TransactionDetail";
import { CommonProps, IUserInfo } from "../../CommonComponents/AppInterfaces";
import { PaymentTypeMapping, PaymentTypeMappingStyle } from "../MappingData/PaymentTypeMapping";
import { FormOutlined, FileDoneOutlined, FileAddOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons';
import { AdminService } from "../AdminService";
import { CreateTransaction } from "../DialogTemplates/CreateTransaction";

interface ITransactionManagementState {
    activeTabs: string;
    isOpenCreateForm: boolean;
}

interface ITransactionManagementProps extends CommonProps {
    currentUser: IUserInfo;
}

interface ITableDataProps extends CommonProps {
    status: string;
    currentUser: IUserInfo;
    onCreateTransaction: () => void
}

interface ITableDataState {
    tableColumn: ColumnsType<IColumnData>;
    tableDataSource: IColumnData[];
    isOpenTransDetail: boolean;
    transIdShowing?: string;
}

interface IColumnData {
    id: string;
    userId: string;
    money: number;
    createDate: Date;
    paymentType: number;
    status: string;
    command?: any;
    description: string;

}

export class TransactionManagement extends React.Component<ITransactionManagementProps, ITransactionManagementState> {
    public adminService = new AdminService();
    constructor(props: ITransactionManagementProps) {
        super(props);
        this.state = {
            activeTabs: 'requested',
            isOpenCreateForm: false
        }
    }

    componentDidMount(): void {
    }

    render(): React.ReactNode {
        return (
            <Row justify={'center'}>
                <Col span={22}>
                    <Tabs
                        defaultActiveKey={this.state.activeTabs}
                        items={[
                            {
                                label: (
                                    <span>
                                        <FileAddOutlined />
                                        Requested Transaction
                                    </span>
                                ),
                                key: 'requested',
                                children: [
                                    <TableTransaction
                                        currentUser={this.props.currentUser}
                                        destroyMessage={this.props.destroyMessage}
                                        openMessage={this.props.openMessage}
                                        status='0'
                                        onCreateTransaction={this.onCreateTransaction}
                                    />
                                ]
                            },
                            {
                                label: (
                                    <span>
                                        <FileDoneOutlined />
                                        Approved Transaction
                                    </span>
                                ),
                                key: 'approved',
                                children: [
                                    <TableTransaction
                                        currentUser={this.props.currentUser}
                                        destroyMessage={this.props.destroyMessage}
                                        openMessage={this.props.openMessage}
                                        status='1'
                                        onCreateTransaction={this.onCreateTransaction}
                                    />
                                ]
                            },
                            {
                                label: (
                                    <span>
                                        <FileExcelOutlined />
                                        Rejected Transaction
                                    </span>
                                ),
                                key: 'rejected',
                                children: [
                                    <TableTransaction
                                        currentUser={this.props.currentUser}
                                        destroyMessage={this.props.destroyMessage}
                                        openMessage={this.props.openMessage}
                                        status='-1'
                                        onCreateTransaction={this.onCreateTransaction}
                                    />
                                ]
                            }
                        ]}
                    />
                    <CreateTransaction 
                        isOpen={this.state.isOpenCreateForm}
                        onApprove={this.onSubmitForm}
                        onCancel={this.onCancelForm}
                        openMessage={this.props.openMessage}
                        destroyMessage={this.props.destroyMessage}
                    />
                </Col>
            </Row>
        )
    }

    public onCreateTransaction = (): void => {
        this.setState({
            isOpenCreateForm: true
        })
    }

    public onSubmitForm = (formData: any): void => {
        this.adminService.sendRequestRecharge(formData).then(res => {
            if (res.status) {
                let requestedId = res.response.data.id;
                let keyLoading = `loading_${new Date().getTime()}`
                this.adminService.approveTransaction(requestedId).then(res => {
                    this.props.destroyMessage(keyLoading);
                    if (res.status) {
                        this.props.openMessage('success', 'Approved Transaction successful.', 2);
                        this.setState({
                            isOpenCreateForm: false
                        })
                    } else {
                        this.props.openMessage('error', 'Approved Transaction Failed.', 2);
                    }
                })
                this.setState({
                    isOpenCreateForm: false
                })
            }
        })
        
    }

    public onCancelForm = (): void => {
        this.setState({
            isOpenCreateForm: false
        })
    }
}

class TableTransaction extends React.Component<ITableDataProps, ITableDataState> {
    public adminService = new AdminService();

    constructor(props: ITableDataProps) {
        super(props);
        this.state = {
            tableColumn: [],
            tableDataSource: [],
            isOpenTransDetail: false,
        }
    }

    componentDidMount(): void {
        this.updateTableColumn();
        this.getDataSource();
    }

    render(): React.ReactNode {
        return (
            <Row justify={'center'}>
                <Col span={22}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={this.props.onCreateTransaction}>Create</Button>
                    <div style={{ padding: 10 }} ></div>
                    <Table columns={this.state.tableColumn} dataSource={this.state.tableDataSource} />
                    {
                        this.state.isOpenTransDetail ?
                            <TransactionDetail
                                isOpen={this.state.isOpenTransDetail}
                                transactionId={this.state.transIdShowing as string}
                                onApprove={this.onTransDetailApprove}
                                onReject={this.onTransDetailReject}
                                onCancel={this.onTransDetailCancel}
                                currentUser={this.props.currentUser}
                                destroyMessage={this.props.destroyMessage}
                                openMessage={this.props.openMessage}
                            />
                            : <></>
                    }

                </Col>
            </Row>
        )
    }

    private updateTableColumn(): void {
        let columns: ColumnsType<IColumnData> = [
            {
                title: 'Payment Type',
                key: 'paymentType',
                width: 130,
                render: (data: IColumnData) => {
                    // return <span>{(PaymentTypeMapping as any)[PaymentTypeMappingStyle]}</span>
                    return <Tag color={(PaymentTypeMappingStyle as any)[data.paymentType.toString()]} key={data.status}>
                        {(PaymentTypeMapping as any)[data.paymentType.toString()]}
                    </Tag>
                }
            },
            {
                title: 'Description',
                key: 'description',
                render: (data: IColumnData) => {
                    return <span>{data.description}</span>
                }
            },
            {
                title: 'Price',
                key: 'money',
                width: 120,
                align: 'right',
                render: (data: IColumnData) => {
                    return <NumericFormat thousandSeparator=',' value={data['money']} displayType='text' suffix=" ₫" />
                }
            },
            {
                title: 'Requested Date',
                key: 'createDate',
                width: 190,
                render: (data: IColumnData) => {
                    return <span>{moment(data.createDate).format('MM/DD/YYYY, h:mm:ss A')}</span>
                }
            },
            {
                title: 'Status',
                key: 'status',
                render: (data: IColumnData) => {
                    return <Tag color={(TransStatusMappingStyle as any)[data.status.toString()]} key={data.status}>
                        {(TransStatusMapping as any)[data.status.toString()]}
                    </Tag>
                }
            },
            {
                title: '',
                key: 'command',
                width: 50,
                render: (data: IColumnData) => {
                    return (
                        <Button style={{ backgroundColor: '#64be43' }}
                            type="primary" shape="default" icon={<FormOutlined />}
                            onClick={() => {
                                this.setState({
                                    isOpenTransDetail: true,
                                    transIdShowing: data.id
                                })
                            }}
                        />
                    )
                }
            }
        ];

        this.setState({
            tableColumn: columns
        })
    }

    onTransDetailApprove = (): void => {
        let keyLoading = `loading_${new Date().getTime()}`
        this.props.openMessage('loading', 'Approving transaction...', 300, keyLoading)
        this.adminService.approveTransaction(this.state.transIdShowing as string).then(res => {
            this.props.destroyMessage(keyLoading);
            if (res.status) {
                this.props.openMessage('success', 'Approved Transaction successful.', 2);
                this.setState({
                    isOpenTransDetail: false,
                    transIdShowing: ''
                })
                this.getDataSource();
            } else {
                this.props.openMessage('error', 'Approved Transaction Failed.', 2);
                this.setState({
                    isOpenTransDetail: false,
                    transIdShowing: ''
                })
            }
        })
    }

    onTransDetailReject = (): void => {
        let keyLoading = `loading_${new Date().getTime()}`
        this.props.openMessage('loading', 'Rejecting transaction...', 300, keyLoading)
        this.adminService.rejectTransaction(this.state.transIdShowing as string).then(res => {
            this.props.destroyMessage(keyLoading);
            if (res.status) {
                this.props.openMessage('success', 'Rejecting Transaction successful.', 2);
                this.setState({
                    isOpenTransDetail: false,
                    transIdShowing: ''
                })
                this.getDataSource();
            } else {
                this.props.openMessage('error', 'Rejecting Transaction Failed.', 2);
                this.setState({
                    isOpenTransDetail: false,
                    transIdShowing: ''
                })
            }
        })
    }

    onTransDetailCancel = (): void => {
        this.setState({
            isOpenTransDetail: false,
            transIdShowing: ''
        })
    }

    private getDataSource(): void {
        this.adminService.getListTransaction(this.props.status).then(res => {
            if (res.status) {
                this.setState({
                    tableDataSource: res.response.data
                })
            }
        });

    }
}