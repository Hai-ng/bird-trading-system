import { Button, Col, Divider, Pagination, Row, Tag } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { NumericFormat } from "react-number-format";
import CoreServices from "../../../services/data.services";
import { CommonUtility } from "../../../utilities/utilities";
import { FooterTemplate } from "../../CommonComponents/Footer";
import { HeaderTemplate } from "../../CommonComponents/Header";
import { StarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

interface IAccessoryDetailPageProps {
    id?: string,
    history: any,
    location: any,
    match: any
}

interface IAccessoryDetailPageState {
    isDataLoading: boolean;
    accessoryDetail: any;
    postPackage: Array<any>;
    imageSelected: number;
}

export class AccessoryDetailPage extends React.Component<IAccessoryDetailPageProps, IAccessoryDetailPageState> {
    public coreService = new CoreServices();

    constructor(props: IAccessoryDetailPageProps) {
        super(props);
        this.state = {
            isDataLoading: false,
            accessoryDetail: null,
            postPackage: [],
            imageSelected: 1
        }
    }
    componentDidMount(): void {
        this.getPostPrice();
        this.getAccessoryDetail();
    }

    render(): React.ReactNode {
        let _postPackage = cloneDeep(this.state.postPackage);
        let objectMapping = _postPackage.filter(item => {
            return item.queue === this.state.accessoryDetail?.postTransactions[0]?.queue;
        })[0];
        return (
            <div>
                <HeaderTemplate activeTab={0}></HeaderTemplate>
                <div className="gap-element"></div>
                <div className="App-body-contain">
                    <Row style={{
                        width: '80%',
                        marginLeft: '10%',
                        backgroundColor: '#F5F5F5',
                        boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030'
                    }}>
                        {(!this.state.isDataLoading && objectMapping) ?
                            <div className="App-row-post-info">
                                <Col span={24} className="app-post-info">
                                    <div className="app-col-post-item">
                                        <div className="app-post-detail">
                                            <img className="app-post-short-img" src={this.state.accessoryDetail?.medias[this.state.imageSelected - 1]?.url} alt='' style={{
                                                minHeight: 400, maxHeight: 400, minWidth: 280, maxWidth: 280
                                            }} />
                                            <Pagination
                                                style={{ height: 135 }}
                                                itemRender={(props, type) => {

                                                    if (type === 'page') {
                                                        return <img src={this.state.accessoryDetail?.medias[props - 1]?.url} alt='' style={{
                                                            minHeight: 130, maxHeight: 130, minWidth: 90, maxWidth: 90
                                                        }} />
                                                    }
                                                    if (type === 'prev') {
                                                        return (
                                                            <LeftOutlined />
                                                        )

                                                    }
                                                    if (type === 'next') {
                                                        return (
                                                            <RightOutlined />
                                                        )
                                                    }
                                                }}
                                                onChange={(page) => {
                                                    this.setState({
                                                        imageSelected: page
                                                    })
                                                }}
                                                total={this.state.accessoryDetail?.medias.length}
                                                pageSize={1}
                                            />
                                        </div>

                                        <div className="app-post-short-detail" style={{ padding: 14 }}>
                                            <span className="app-post-title" style={{ color: objectMapping.style.color, fontWeight: objectMapping.style.fontWeight }}>
                                                {objectMapping.style.markIcon ? <StarOutlined /> : ''} {objectMapping.style.isUpper ? this.state.accessoryDetail['title'].toUpperCase() : this.state.accessoryDetail['title']}
                                            </span>

                                            <div className="app-desciption">
                                                Mô tả: {this.state.accessoryDetail['description']}</div>
                                            <span>
                                                Giá: <NumericFormat thousandSeparator=',' value={this.state.accessoryDetail['price']} displayType='text' suffix=" ₫" />
                                            </span>
                                            <span className="app-post-location">
                                                Địa chỉ: {this.state.accessoryDetail['address']}
                                            </span>
                                            <span className="app-post-owner">
                                                Người bán: {this.state.accessoryDetail['nameSeller']}
                                            </span>
                                            <span className="app-post-location">
                                                Liên hệ: <Tag color='cyan-inverse'>{this.state.accessoryDetail['phoneSeller']}</Tag>
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                                {/* <Col span={24} className="app-post-characteristic">
                                    <div className="gap-element"></div>
                                    <Divider orientation="left">Đặc điểm nổi bật</Divider>
                                    <div className="app-characteristic-item">
                                        Tuổi đời: <span>23 tháng</span>
                                    </div>
                                    <div className="app-characteristic-item">
                                        Thức ăn ưa thích: <span>Dế, cám trứng</span>
                                    </div>
                                    <div className="app-characteristic-item">
                                        Các giải đấu đã tham dự: <span>King of Bird Championship</span>
                                    </div>
                                    <div className="app-characteristic-item">
                                        Khác: <span></span>
                                    </div>
                                </Col> */}
                            </div>
                            : <div></div>
                        }

                    </Row>
                </div>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }

    private getPostPrice(): void {
        let postPrice = localStorage.getItem('postPrice');
        if (!CommonUtility.isNullOrUndefined(postPrice)) {
            this.setState({
                postPackage: JSON.parse(postPrice as string)
            });
            return;
        }
        this.coreService.getPostPrice().then(res => {
            if (res.status) {
                let arrayPacks = this.coreService.mappingStylePostPack(res.response.data);
                this.setState({
                    postPackage: arrayPacks
                });
                localStorage.setItem('postPrice', JSON.stringify(arrayPacks));
            }
        })
    }

    private getAccessoryDetail(): void {
        let id = this.props.match.params.id;
        this.coreService.getBirdById(id).then(res => {
            this.setState({
                isDataLoading: false,
                accessoryDetail: res.response.data.data
            })
        })
    }
}