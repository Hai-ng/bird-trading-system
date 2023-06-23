import React from "react";
import { Button, Col, Row, Table, Tag } from "antd";
import { FormOutlined } from '@ant-design/icons';
import { ColumnsType } from "antd/es/table";
import { AdminService } from "../AdminService";
import { CommonProps, IUserInfo } from "../../CommonComponents/AppInterfaces";
import { CreatePackPrice } from "../DialogTemplates/CreatePackPrice";
import { PackDetail } from "../DialogTemplates/PackDetail";
import { NumericFormat } from "react-number-format";


interface IPackManagementState {
    tableColumn: ColumnsType<IColumnData>;
    tableDataSource: IColumnData[];
    isOpenCreateForm: boolean;
    isOpenPackDetail: boolean;
    packIdShowing?: string;

}

interface IPackManagementProps extends CommonProps {
    currentUser: IUserInfo;
}

interface IColumnData {
    // queue: string;
    title: string;
    // expiredDay: string;
    price: any;
    id: string;
    createDate: string;
    updateDate: string;
}

export class PackManagement extends React.Component<IPackManagementProps, IPackManagementState> {
    public adminService = new AdminService();

    constructor(props: IPackManagementProps) {
        super(props);
        this.state = {
            tableColumn: [],
            tableDataSource: [],
            isOpenCreateForm: false,
            isOpenPackDetail: false,

        }
    }

    componentDidMount(): void {
        this.updateTableColumn();
        this.getDataSource();
    }

    private getDataSource(): void {
        this.adminService.getListPack().then((res: any) => {
            if (res.status) {
                this.setState({
                    tableDataSource: res.response.data,
                })
            }
        })
    }


    private updateTableColumn(): void {
        let columns: ColumnsType<IColumnData> = [
            {
                title: 'Title',
                key: 'title',
                render: (data: IColumnData) => {
                    return <span>{data.title}</span>
                }
            },
            {
                title: 'Price (vnd/day)',
                key: 'price',
                render: (data: IColumnData) => {
                    return <NumericFormat thousandSeparator=',' value={data.price?.price ?? 0} displayType='text' suffix=" ₫" />
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
                                    isOpenPackDetail: true,
                                    packIdShowing: data.id
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

    onUserDetailCancel = (): void => {
        this.setState({
            isOpenPackDetail: false,
            packIdShowing: ''
        });
        this.getDataSource();
    }

    onSavePack = (data: any): void => {
        //call endpoint update pack
        this.adminService.updatePackageInfo(data, this.state.packIdShowing as string).then(res => {
            if (res.status) {
                this.setState({
                    isOpenPackDetail: false,
                    packIdShowing: ''
                });
                this.props.openMessage('success', 'Update Pack Info sucessful.', 2);
                this.getDataSource();
            } else {
                if (res.response?.response?.data?.message) {
                    this.props.openMessage('error', res.response.response.data.message, 2);
                } else {
                    this.props.openMessage('error', 'Update Pack Failed.', 2);
                }
            }
        })

    }

    render(): React.ReactNode {
        return (
            <Row justify={'center'}>
                <Col span={22}>

                    <Table columns={this.state.tableColumn} dataSource={this.state.tableDataSource} />

                    {
                        this.state.isOpenPackDetail ?
                            <PackDetail
                                isOpen={this.state.isOpenPackDetail}
                                id={this.state.packIdShowing as string}
                                onSave={this.onSavePack}
                                // onReject={this.onUserDetailReject}
                                onCancel={this.onUserDetailCancel}
                                currentUser={this.props.currentUser}
                            />
                            : <></>
                    }
                    {/* <CreatePackPrice
                        isOpen={this.state.isOpenCreateForm}
                        onApprove={this.onSubmitForm}
                        onCancel={this.onCancelForm}
                        openMessage={this.props.openMessage}
                        destroyMessage={this.props.destroyMessage}
                    /> */}
                </Col>
            </Row>

        )
    }

    public onCreatePackPrice = (): void => {
        this.setState({
            isOpenCreateForm: true
        })
    }

    public onSubmitForm = (formData: any): void => {
        this.adminService.getListPack().then((res: any) => {
            if (res.status) {
                let packId = res.resonse
                this.setState({
                    tableDataSource: res.response.data,
                })
            }
        })

        // this.adminService.createPackPrice(formData).then(res => {
        //     if (res.status) {
        //         this.props.openMessage('success', 'Update price successful.', 2);
        //         this.setState({
        //             isOpenCreateForm: false
        //         })
        //         this.componentDidMount();
        //     } else {
        //         this.props.openMessage('error', 'Update Failed.', 2);
        //     }

        //     this.setState({
        //         isOpenCreateForm: false
        //     })

        // })

    }

    public onCancelForm = (): void => {
        this.setState({
            isOpenCreateForm: false
        })
    }
}
