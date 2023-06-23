import React from "react";
import { Button, Col, Row, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { AdminService } from "../AdminService";
import CoreServices from "../../../services/data.services";
import { CommonProps, IUserInfo } from "../../CommonComponents/AppInterfaces";
import { FormOutlined } from '@ant-design/icons';
import { UserDetail } from "../DialogTemplates/UserDetail";

interface IUserManagementState {
    tableColumn: ColumnsType<IColumnData>;
    tableDataSource: IColumnData[];
    isOpenUserDetail: boolean;
    userIdShowing?: string;
}

interface IUserManagementProps extends CommonProps {
    currentUser: IUserInfo;
}

interface IColumnData {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    username: string;
    email?: string;
    userId: string;
    createDate: string;
    updateDate:string;
    address?: string;
    balance?: number;

}

export class UserManagement extends React.Component<IUserManagementProps, IUserManagementState> {
    public adminService = new AdminService();

    constructor(props: IUserManagementProps) {
        super(props);
        this.state = {
            tableColumn: [],
            tableDataSource: [],
            isOpenUserDetail: false,
        }
    }

    componentDidMount(): void {
        this.updateTableColumn();
        this.getDataSource();
    }

    private getDataSource(): void {
        this.adminService.getListUser().then((res: any) => {
            if (res.status) {
                this.setState({
                    tableDataSource: res.response.data
                })
            }
        })
    }

    private updateTableColumn(): void {
        let columns: ColumnsType<IColumnData> = [
            {
                title: 'Firstname',
                key: 'firstName',
                render: (data: IColumnData) => {
                    return <span>{data.firstName}</span>
                }
            },
            {
                title: 'Lastname',
                key: 'lastName',
                render: (data: IColumnData) => {
                    return <span>{data.lastName}</span>
                }
            },
            {
                title: 'Username',
                key: 'username',
                render: (data: IColumnData) => {
                    return <span>{data.username}</span>
                }
            },
            {
                title: 'Balance',
                key: 'balance',
                render: (data: IColumnData) => {
                    return <span>{data.balance}</span>
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
                                    isOpenUserDetail: true,
                                    userIdShowing: data.id
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
            isOpenUserDetail: false,
            userIdShowing: ''
        })
    }

    render(): React.ReactNode {
        return (
            <Row justify={'center'}>
                <Col span={22}>
                    <Table columns={this.state.tableColumn} dataSource={this.state.tableDataSource} />
                    {
                        this.state.isOpenUserDetail ?
                            <UserDetail
                                isOpen={this.state.isOpenUserDetail}
                                userId={this.state.userIdShowing as string}
                                // onApprove={this.onUserDetailApprove}
                                // onReject={this.onUserDetailReject}
                                onCancel={this.onUserDetailCancel}
                                currentUser={this.props.currentUser}
                            />
                            : <></>
                    }
                </Col>
            </Row>
            
        )
    }
}
