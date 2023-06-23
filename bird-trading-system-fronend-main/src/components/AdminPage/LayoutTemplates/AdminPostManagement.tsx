import { Button, Col, Row, Table, Tabs, Tag, Tooltip } from "antd";
import React from "react";
import { CommonProps, IUserInfo } from "../../CommonComponents/AppInterfaces";
import { PreviewPostDetail } from "../DialogTemplates/PreviewPostDetail";
import { ColumnsType } from "antd/es/table";
import { AdminService } from "../AdminService";
import { PostStatusMapping, PostStatusMappingStyle } from "../MappingData/PostStatusMapping";
import moment from "moment";
import { EyeOutlined, FileDoneOutlined, FileAddOutlined, FileExcelOutlined } from '@ant-design/icons';


interface IAdminPostManagementtProps extends CommonProps {
    currentUser: IUserInfo;
}

interface IAdminPostManagementState {
    activeTabs: string;
}

interface ITableDataProps extends CommonProps {
    url: string;
    currentUser: IUserInfo;
}

interface ITableDataState {
    tableColumn: ColumnsType<IColumnData>;
    tableDataSource: IColumnData[];
    postId: string;
    isShowPreviewPost: boolean;
}

interface IColumnData {
    id: string;
    user: string;
    categoryTitle: string;
    title: string;
    createDate: string;
    status: number;
    command?: any;
}

export class PostManagement extends React.Component<IAdminPostManagementtProps, IAdminPostManagementState> {

    constructor(props: any) {
        super(props);
        this.state = {
            activeTabs: 'requested'
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
                                        Requested Post
                                    </span>
                                ),
                                key: 'requested',
                                children: [
                                    <TablePost
                                        currentUser={this.props.currentUser}
                                        destroyMessage={this.props.destroyMessage}
                                        openMessage={this.props.openMessage}
                                        url='/api/v1/posts/process'
                                    />
                                ]
                            },
                            {
                                label: (
                                    <span>
                                        <FileDoneOutlined />
                                        Approved Post
                                    </span>
                                ),
                                key: 'approved',
                                children: [
                                    <TablePost
                                        currentUser={this.props.currentUser}
                                        destroyMessage={this.props.destroyMessage}
                                        openMessage={this.props.openMessage}
                                        url='/api/v1/posts?status=1'
                                    />
                                ]
                            },
                            {
                                label: (
                                    <span>
                                        <FileExcelOutlined />
                                        Rejected Post
                                    </span>
                                ),
                                key: 'rejected',
                                children: [
                                    <TablePost
                                        currentUser={this.props.currentUser}
                                        destroyMessage={this.props.destroyMessage}
                                        openMessage={this.props.openMessage}
                                        url='/api/v1/posts?status=-1'
                                    />
                                ]
                            }
                        ]}
                    />
                </Col>
            </Row>
        )
    }
}

class TablePost extends React.Component<ITableDataProps, ITableDataState> {
    public adminService = new AdminService();

    constructor(props: ITableDataProps) {
        super(props);
        this.state = {
            tableColumn: [],
            tableDataSource: [],
            isShowPreviewPost: false,
            postId: ''
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
                    <Table columns={this.state.tableColumn} dataSource={this.state.tableDataSource} />
                    {
                        this.state.isShowPreviewPost ?
                            <PreviewPostDetail
                                currentUser={this.props.currentUser}
                                isOpen={this.state.isShowPreviewPost}
                                postId={this.state.postId}
                                onApprove={this.onPostApprove}
                                onReject={this.onPostReject}
                                onCancel={this.onCancel}
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
                title: 'Title',
                key: 'title',
                render: (data: IColumnData) => {
                    return <span>{data.title}</span>
                }
            },
            {
                title: 'Created Date',
                key: 'createdDate',
                width: 210,
                render: (data: IColumnData) => {
                    return <span>{moment(data.createDate).format('MM/DD/YYYY, h:mm:ss A')}</span>
                }
            },
            {
                title: 'Category',
                key: 'category',
                width: 150,
                render: (data: IColumnData) => {
                    return <span>{data.categoryTitle}</span>
                }
            },
            {
                title: 'Status',
                key: 'status',
                width: 130,
                render: (data: IColumnData) => {
                    return <Tag color={(PostStatusMappingStyle as any)[data.status.toString()]} key={data.status}>
                        {(PostStatusMapping as any)[data.status.toString()]}
                    </Tag>
                }
            },
            {
                title: '',
                width: 60,
                key: 'command',
                render: (data: IColumnData) => {
                    return (

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Tooltip placement="bottom" title='Preview'>
                                <Button
                                    style={{ backgroundColor: '#C0C0C0' }}
                                    type="primary" shape="default"
                                    icon={<EyeOutlined />}
                                    onClick={() => {
                                        this.setState({
                                            postId: data.id,
                                            isShowPreviewPost: true
                                        })
                                    }} />
                            </Tooltip>
                        </div>
                    )
                }
            }
        ];

        this.setState({
            tableColumn: columns
        })
    }

    private getDataSource(): void {
        this.adminService.getListPost(this.props.url).then((res: any) => {
            if (res.status) {
                this.setState({
                    tableDataSource: res.response.data.data
                })
            }
        })
    }

    public onPostApprove = (): void => {
        let keyLoading = `loading_${new Date().getTime()}`
        this.props.openMessage('loading', 'Approving post...', 300, keyLoading)
        this.adminService.onApprovePost(this.state.postId as string).then(res => {
            this.props.destroyMessage(keyLoading);
            if (res.status) {
                this.props.openMessage('success', 'Approved Post Successful.', 2);
                this.setState({
                    isShowPreviewPost: false,
                    postId: ''
                })
                this.getDataSource();
            } else {
                if (res.response?.response?.data?.message) {
                    this.props.openMessage('error', res.response.response.data.message, 2);
                } else {
                    this.props.openMessage('error', 'Approved Post Failed.', 2);
                }
                this.setState({
                    isShowPreviewPost: false,
                    postId: ''
                })
            }
        })
    }

    public onPostReject = (): void => {
        let keyLoading = `loading_${new Date().getTime()}`
        this.props.openMessage('loading', 'Rejecting post...', 300, keyLoading)
        this.adminService.onRejectPost(this.state.postId as string).then(res => {
            this.props.destroyMessage(keyLoading);
            if (res.status) {
                this.props.openMessage('success', 'Rejecting Post Successful.', 2);
                this.setState({
                    isShowPreviewPost: false,
                    postId: ''
                })
                this.getDataSource();
            } else {
                this.props.openMessage('error', 'Rejecting Post Failed.', 2);
                this.setState({
                    isShowPreviewPost: false,
                    postId: ''
                })
            }
        })
    }

    public onCancel = (): void => {
        this.setState({
            isShowPreviewPost: false,
            postId: ''
        })
    }
}