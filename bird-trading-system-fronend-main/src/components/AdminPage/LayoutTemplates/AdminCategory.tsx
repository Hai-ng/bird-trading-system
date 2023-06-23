import React from "react";
import { Button, Col, Row, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { AdminService } from "../AdminService";
import CoreServices from "../../../services/data.services";
import { CommonProps, IUserInfo } from "../../CommonComponents/AppInterfaces";
import { FormOutlined, PlusOutlined } from '@ant-design/icons';
import { CreateCategory } from "../DialogTemplates/CreateCategory";
// import { CreateCategory } from "../DialogTemplates/CreateCategory";


// interface ICategoryManagementState {
//     activeTabs: string;
//     isOpenCreateForm: boolean;
// }


interface ICategoryState {
    tableColumn: ColumnsType<IColumnData>;
    tableDataSource: IColumnData[];
    isOpenCreateForm: boolean;

    // isOpenTransDetail: boolean;
    // transIdShowing?: string;
}

interface ICategoryProps extends CommonProps {
    currentUser: IUserInfo;
    // onCreateCategory: () => void
    // status: string;
}

interface ICategoryManagementProps extends CommonProps {
    status: string;
    currentUser: IUserInfo;
    onCreateCategory: () => void
}


interface IColumnData {

    id: string | null;
    classifyCategory: number;
    title: string;
    createDate: string;
    updateDate: string;

}



export class Category extends React.Component<ICategoryProps, ICategoryState> {
    public adminService = new AdminService();

    constructor(props: ICategoryProps) {
        super(props);
        this.state = {
            tableColumn: [],
            tableDataSource: [],
            isOpenCreateForm: false,
            // isOpenTransDetail: false,
        }
    }

    componentDidMount(): void {
        this.updateTableColumn();
        this.getDataSource();
    }

    // componentDidUpdate(): void {
    //     this.updateTableColumn();

    // }

    private getDataSource(): void {
        this.adminService.getListCategory().then((res: any) => {
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
                title: 'Classify',
                key: 'firstclassifyCategoryName',
                render: (data: IColumnData) => {
                    return <span>{data.classifyCategory}</span>
                }
            },
            {
                title: 'Title',
                key: 'title',
                render: (data: IColumnData) => {
                    return <span>{data.title}</span>
                }
            },
        ];

        this.setState({
            tableColumn: columns
        })
    }

    render(): React.ReactNode {
        return (
            <Row justify={'center'}>
                <Col span={22}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={this.onCreateCategory}>New Category</Button>

                    <Table columns={this.state.tableColumn} dataSource={this.state.tableDataSource} />
                    <CreateCategory
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

    public onCreateCategory = (): void => {
        this.setState({
            isOpenCreateForm: true
        })
    }

    public onSubmitForm = (formData: any): void => {
        this.adminService.createCategory(formData).then(res => {
            // if (res.status) {
            // let requestedId = res.response.data.id;
            // let keyLoading = `loading_${new Date().getTime()}`
            // this.adminService.approveTransaction(requestedId).then(res => {
            // this.props.destroyMessage(keyLoading);
            if (res.status) {
                this.props.openMessage('success', 'Create Category successful.', 2);
                this.setState({
                    isOpenCreateForm: false
                })
                this.componentDidMount();
            } else {
                this.props.openMessage('error', 'Create Failed.', 2);
            }
            // })
            this.setState({
                isOpenCreateForm: false
            })
            // }
        })

    }

    public onCancelForm = (): void => {
        this.setState({
            isOpenCreateForm: false
        })
    }
}
