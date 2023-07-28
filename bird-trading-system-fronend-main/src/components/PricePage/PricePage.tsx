import React from "react";
import { Button, Col, Row, Table, Divider } from "antd";
import { ColumnsType } from "antd/es/table";
import { AdminService } from ".././AdminPage/AdminService";
import { CommonProps} from "../CommonComponents/AppInterfaces";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";
// import { CreatePackPrice } from ".././AdminPage/DialogTemplates/CreatePackPrice";


interface IPricePageState {
    tableColumn: ColumnsType<IColumnData>;
    tableDataSource: IColumnData[];
}

interface IPricePageProps extends CommonProps {
    // currentUser: IUserInfo;
}

interface IColumnData {
    title: string;
    price: any;
    id: string | null;
    createDate: string;
    updateDate: string;
}

export class PricePage extends React.Component<IPricePageProps, IPricePageState> {
    public adminService = new AdminService();

    constructor(props: IPricePageProps) {
        super(props);
        this.state = {
            tableColumn: [],
            tableDataSource: [],
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
                title: 'Loại tin',
                key: 'title',
                render: (data: IColumnData) => {
                    return <span>{data.title}</span>
                }
            },
            {
                title: 'Giá (vnđ / ngày)',
                key: 'price',
                render: (data: IColumnData) => {
                    return <span>{data.price.price}</span>
                }
            },
        ];

        this.setState({
            tableColumn: columns
        })
    }

    render(): React.ReactNode {
        return (


            <div>
                <HeaderTemplate activeTab={0}></HeaderTemplate>
                <div>
                    <h2 style={{ textAlign: 'center' }}> Bảng giá đăng bài</h2>
                    <Divider />
                    <div style={{ margin: '12%', marginTop: '3%', marginBottom: '3%' }}>
                        <Row justify={'center'}>
                            <Col span={22}>

                                <Table columns={this.state.tableColumn} dataSource={this.state.tableDataSource} pagination={false} />
                                <h3>
                                    Lưu ý
                                </h3>
                                <ul>
                                <li style={{color: 'red'}}>Gói Banner sẽ dược hiển thị ở ảnh bìa trang chủ</li>
                                <li style={{color: 'red'}}>Mức độ ưu tiên của các gói theo thứ tự tăng dần : Bronze - Silver - Gold</li>
                                <li> Tất cả các bài viết được hiển thị ở trang tin tức theo loại tin đã chọn </li>
                                <li> Các khung giờ lên bài: 8h - 11h, 14h - 17h</li>
                                <li> Thời gian gửi bài: Khách hàng gửi nội dung bài hoàn chỉnh trước khi xuất bản lên website birdtrade.com.vn ít nhất 4 giờ làm việc. </li>
                                <li> Nội dung bài viết tối đa 1000 từ. </li>
                                </ul>
                                
                            </Col>
                        </Row>
                    </div>

                </div>
                <FooterTemplate></FooterTemplate>

            </div>

        )
    }

}




