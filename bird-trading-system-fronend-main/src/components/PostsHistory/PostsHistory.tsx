import React from "react";
import { IPostsHistoryProps, IPostsHistoryState } from './IPostsHistory';
import { NumericFormat } from "react-number-format";
import { FooterTemplate } from "../CommonComponents/Footer";
import { HeaderTemplate } from "../CommonComponents/Header";
import { Button, Col, Divider, Form, Layout, Row, Select, Tag } from "antd";
import { SearchOutlined, StarOutlined } from '@ant-design/icons';
import CoreServices from "../../services/data.services";
import { cloneDeep } from "lodash";
import { CommonUtility } from "../../utilities/utilities";
import { PostStatusMapping, PostStatusMappingStyle } from "../CommonComponents/PostStatusMapping";
import moment from "moment";


export class PostsHistory extends React.Component<IPostsHistoryProps, IPostsHistoryState> {
    public coreService = new CoreServices();
    constructor(props: IPostsHistoryProps) {
        super(props);
        this.state = {
            isDataLoading: true,
            isDisableButtonSearch: true,
            filter: {
                category: '',
                packageType: '',
                status: ''
            },
            listPost: [],
            postPackage: [],
            currentUser: null
        }
    }

    componentDidMount(): void {
        //check user login existed?
        let user = localStorage.getItem('currentUser');
        if (CommonUtility.isNullOrUndefined(user)) {
            CommonUtility.redirectTo('/login');
        } else {
            this.setState({
                currentUser: JSON.parse(user as string)
            });
            setTimeout(() => {
                this.getPostHistory();
                this.getPostPrice();
            }, 500);
        }

    }

    render(): React.ReactNode {
        return (
            this.state.currentUser ?
                <div>
                    <HeaderTemplate activeTab={0}></HeaderTemplate>
                    <Layout className="App-post-layout-container">
                        <div className="App-left-filter-panel">
                            <Divider className="divider-title" orientation="left">Tìm kiếm</Divider>
                            <Form
                                labelCol={{ span: 24 }}
                                layout='vertical'
                                style={{ width: '90%', paddingLeft: 10, margin: 10 }}
                            >
                                <Form.Item label='Loại bài đăng:'>
                                    <Select
                                        onChange={(value) => {
                                            this.onFilterDataStateChange('category', value);
                                        }}
                                        value={this.state.filter.category}
                                        style={{ width: '100%' }}
                                        placeholder="Chọn loại bài đăng"
                                        options={[
                                            { label: 'Chim Cảnh', value: 'bird' },
                                            { label: 'Lồng Chim', value: 'cage' },
                                            { label: 'Phụ Kiện', value: 'accessory' }
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label='Trạng thái bài đăng:'>
                                    <Select
                                        onChange={(value) => {
                                            this.onFilterDataStateChange('status', value);
                                        }}
                                        value={this.state.filter.status}
                                        style={{ width: '100%' }}
                                        placeholder="Chọn trạng thái"
                                        options={[
                                            { label: 'Đã được duyệt', value: '1' },
                                            { label: 'Đang chờ duyệt', value: '0' },
                                            { label: 'Bị cấm', value: '-1' }
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item label='Gói đăng'>
                                    <Select
                                        onChange={(value) => {
                                            this.onFilterDataStateChange('packageType', value);
                                        }}
                                        style={{ width: '100%' }}
                                        placeholder="Chọn gói đăng"
                                        value={this.state.filter.packageType}
                                        options={this.state.postPackage.map(item => {
                                            return {
                                                label: item.title,
                                                value: item.id
                                            }
                                        })}
                                    >
                                    </Select>
                                </Form.Item>
                                <div className="app-button-search">
                                    <Button onClick={() => { this.onClearSearch() }} disabled={this.state.isDisableButtonSearch}>Xoá</Button>
                                    <Button icon={<SearchOutlined />} onClick={() => { this.onSearchBird() }}>Tìm kiếm</Button>
                                </div>
                            </Form>
                        </div>
                        <Divider type="vertical" />
                        <Layout.Content>
                            <Divider className="divider-title" orientation="left">Các bài đã đăng</Divider>
                            {this.renderPost()}
                        </Layout.Content>
                    </Layout>
                    <FooterTemplate></FooterTemplate>
                </div>
                : <></>
        )
    }

    private renderPost(): React.ReactNode {
        let nodes: React.ReactNode[] = [];
        let product = cloneDeep(this.state.listPost);
        let _postPackage = cloneDeep(this.state.postPackage);

        for (let data of product) {
            let activeTransaction = data.postTransactions.filter((item: any) => {
                return item.isCancel === false
            });
            let objectMapping;
            if (activeTransaction.length > 0) {
                objectMapping = _postPackage.filter(item => {
                    return item.queue === activeTransaction[0].packs.queue;
                })[0];
            } else {
                objectMapping = _postPackage.filter(item => {
                    return item.queue === data.postTransactions[0].packs.queue;
                })[0];
            }

            let post = (
                <Col key={`bird_${data['id']}`} span={5} className="app-post-info">
                    <div className="app-col-post-item" style={{
                        boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
                        padding: 15
                    }}>
                        <img className="app-post-short-img"
                            style={{ maxHeight: 300, maxWidth: 230, minHeight: 300, minWidth: 230 }}
                            src={data.medias[0]?.url} alt='' />
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div className="app-post-short-detail">
                                <span className="app-post-title" style={{ color: objectMapping?.style.color, fontWeight: objectMapping?.style.fontWeight }}>
                                    {objectMapping?.style.markIcon ? <StarOutlined /> : ''} {objectMapping?.style.isUpper ? data['title'].toUpperCase() : data['title']}
                                </span>

                                <Row >
                                    <Col span={3}>
                                        Mô tả:
                                    </Col>
                                    <Col span={21}>
                                        <div style={{ maxHeight: 115, textOverflow: 'ellipsis', overflow: 'hidden' }}>{data['description']}</div>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col span={3}>
                                        Giá:
                                    </Col>
                                    <Col span={21}>
                                        <NumericFormat thousandSeparator=',' value={data['price']} displayType='text' suffix=" ₫" />
                                    </Col>
                                </Row>

                                <Row >
                                    <Col span={3}>
                                        Địa chỉ:
                                    </Col>
                                    <Col span={21}>
                                        <span className="app-post-location">{data['address']}</span>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col span={3}>
                                        Trạng thái:
                                    </Col>
                                    <Col span={21}>
                                        <Tag color={(PostStatusMappingStyle as any)[data.statusMapping]}>
                                            {(PostStatusMapping as any)[data.statusMapping]}
                                        </Tag>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={3}>
                                        Hết hạn:
                                    </Col>
                                    <Col span={21}>
                                        <span>{data['expiredDate']}</span>
                                    </Col>
                                </Row>
                            </div>
                            <Button
                                style={{ margin: '10px 24px 0px 32px', backgroundColor: 'gray' }}
                                type="primary"
                                onClick={() => { this.goToPostHistoryDetail(data['id']) }}>
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                </Col>
            );
            nodes.push(post);
        }
        return (
            <>{nodes}</>
        )
    }

    private goToPostHistoryDetail(postId: string): void {
        CommonUtility.redirectTo(`/postHistory/${postId}`);
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

    private onClearSearch(): void {
        let _filter = {
            birdType: '',
            lowestPrice: '',
            highestPrice: '',
            packageType: ''
        }
        this.setState({
            isDisableButtonSearch: true,
            filter: _filter
        });
        // this.getListBirdPost();
    }

    private getPostHistory(): void {
        this.coreService.getMyPost(this.state.currentUser?.id as string).then((res: any) => {
            if (res.status) {
                let data = this.formatDataObject(res.response.data.data.posts)
                this.setState({
                    listPost: data
                });
                return;
            } else {
                let noti_id = `withdraw_${new Date().getTime()}`
                if (res.response.response.status === 401) {
                    this.props.openMessage('info', 'Phiên đăng nhập đã hết hạn', undefined, noti_id);
                    setTimeout(() => {
                        localStorage.removeItem('currentUser');
                        this.props.destroyMessage(noti_id);
                        CommonUtility.redirectTo('/login');
                    }, 3000);
                    return;
                }
            }

        })
    }

    private formatDataObject(data: Array<any>): Array<any> {
        for (let item of data) {
            if (item.status === 2) {
                item['statusMapping'] = 'sold';
                item['expiredDate'] = '';
                continue;
            }
            if (item.status === 0) {
                item['statusMapping'] = 'requested';
                item['expiredDate'] = '';
                continue;
            }
            if (item.status === -1) {
                item['statusMapping'] = 'denied';
                item['expiredDate'] = '';
                continue;
            }
            let activePack = item.postTransactions.filter((pack: any) => {
                return pack.isCancel === false;
            })
            if (activePack.length === 0) {
                item['statusMapping'] = 'emptyPack';
                item['expiredDate'] = '';
                continue;
            }
            let today = new Date();
            let validDate = new Date(activePack[0].validDate);
            if (today > validDate) {
                item['statusMapping'] = 'expired';
                item['expiredDate'] = moment(validDate).format('MM/DD/YYYY, h:mm:ss A');
                continue;
            }
            item['statusMapping'] = 'approved';
            item['expiredDate'] = moment(validDate).format('MM/DD/YYYY, h:mm:ss A');
            continue;
        }

        return data;
    }

    private onSearchBird(): void {
        this.setState({
            isDataLoading: true
        });
        this.coreService.getBirdListOnFilter(this.state.filter as any).then(data => {
            if (CommonUtility.isNullOrUndefined(data.error)) {
                this.setState({
                    listPost: data,
                    isDataLoading: false
                });
                return;
            }
            this.setState({
                listPost: [],
                isDataLoading: false
            });
        })
    }

    private onFilterDataStateChange(property: string, value: string): void {
        let _filter = cloneDeep(this.state.filter as any);
        switch (property) {
            case 'category':
                _filter.category = value;
                break;
            case 'status':
                _filter.status = value;
                break;
            case 'packageType':
                _filter.packageType = value;
                break;
        }
        let isShowButton = false;
        for (let props in _filter) {
            if (!CommonUtility.isNullOrEmpty(_filter[props])) {
                isShowButton = true;
            }
        }
        this.setState({
            filter: _filter,
            isDisableButtonSearch: !isShowButton
        });
    }
}