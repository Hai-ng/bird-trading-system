import { Avatar, Button, Col, Divider, Form, Layout, Select, Tag } from "antd";
import React from "react";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";
import { NumericFormat } from 'react-number-format';
import { IAccessoryPageProps, IAccessoryPageState } from "./IAccessoryPage";
import { SearchOutlined, StarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import CoreServices from "../../services/data.services";
import { CommonUtility } from "../../utilities/utilities";
import { cloneDeep } from 'lodash';
import moment from "moment";
import 'moment/locale/vi';

export class AccessoryPage extends React.Component<IAccessoryPageProps, IAccessoryPageState> {
    public coreService = new CoreServices();
    constructor(props: IAccessoryPageProps) {
        super(props);
        this.state = {
            listPost: [],
            filter: {
                accessoryType: '',
                highestPrice: '',
                lowestPrice: '',
                packageType: ''
            },
            isDataLoading: false,
            postPackage: [],
            isDisableButtonSearch: true
        }
    }

    componentDidMount(): void {
        moment.locale('vi');
        this.getCategories().then((data: Array<any>) => {
            let accessoryId = data.filter(item => {
                return item.title === 'Phụ Kiện';
            })[0].id
            this.getPostPrice();
            this.getListAccessoryPost(accessoryId);
        })
    }


    //#region component render
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={4}></HeaderTemplate>
                <Layout className="App-post-layout-container">
                    <div className="App-left-filter-panel">
                        <Divider className="divider-title" orientation="left">Tìm kiếm</Divider>
                        <Form
                            labelCol={{ span: 24 }}
                            layout='vertical'
                            style={{ width: '90%', marginLeft: '5%' }}
                        >
                            {/* <Form.Item label='Phụ Kiện:'>
                                <Select
                                    onChange={(value) => {
                                        this.onFilterDataStateChange('AccessoryType', value);
                                    }}
                                    value={this.state.filter.accessoryType}
                                    style={{ width: '100%' }}
                                    placeholder="Phụ Kiện"
                                    options={[
                                        { label: 'Chao đồng', value: 'chao_dong' },
                                        { label: 'Cóng chào mào', value: 'cong_chao_mao' },
                                        { label: 'Cóng khuyên', value: 'cong_khuyen' },
                                        { label: 'Cóng vành', value: 'cong_vanh' },
                                        { label: 'Móc tàu', value: 'moc_tau' },
                                    ]}
                                ></Select>
                            </Form.Item> */}
                            <Form.Item label='Mức giá tối thiểu:'>
                                <NumericFormat suffix=" ₫" thousandSeparator=',' displayType="input" className="app-numeric-input" onValueChange={(values) => {
                                    this.onFilterDataStateChange('lowestPrice', values.value);
                                }}
                                    value={Number.parseFloat(this.state.filter.lowestPrice)}
                                />
                            </Form.Item>
                            <Form.Item label='Mức giá tối đa:'>
                                <NumericFormat suffix=" ₫" thousandSeparator=',' displayType="input" className="app-numeric-input" onValueChange={(values) => {
                                    this.onFilterDataStateChange('highestPrice', values.value);
                                }}
                                    value={Number.parseFloat(this.state.filter.highestPrice)}
                                />
                            </Form.Item>
                            <div className="app-button-search">
                                <Button onClick={() => { this.onClearSearch() }} disabled={this.state.isDisableButtonSearch}>Xoá</Button>
                                <Button icon={<SearchOutlined />} onClick={() => { this.onSearchAccessory() }}>Tìm kiếm</Button>
                            </div>
                        </Form>
                    </div>
                    <Divider type="vertical" />
                    <Layout.Content>
                        <Divider className="divider-title" orientation="left">Dành cho bạn</Divider>
                        {this.renderPost()}
                    </Layout.Content>
                </Layout>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }

    private getListAccessoryPost(accessoryId: string): void {
        this.coreService.getPostListBaseOnCategory(accessoryId).then(res => {
            if (res.status) {
                this.setState({
                    listPost: res.response.data.data
                })
            }
        })
    }

    private getCategories(): Promise<Array<any>> {
        return new Promise(resolve => {
            let strCategories = localStorage.getItem('categories');
            if (!CommonUtility.isNullOrEmpty(strCategories)) {
                let objCategories = JSON.parse(strCategories as string);
                resolve(objCategories);
            } else {
                this.coreService.getCategory().then((res: any) => {
                    if (res.status) {
                        resolve(res.response.data)
                    } else {
                        resolve([]);
                    }
                })
            }
        })
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

    private renderPost(): React.ReactNode {
        let nodes: React.ReactNode[] = [];
        let product = cloneDeep(this.state.listPost);
        let _postPackage = cloneDeep(this.state.postPackage);

        for (let data of product) {
            let objectMapping = _postPackage.filter(item => {
                return item.queue === data.postTransaction?.queue;
            })[0];
            let post = (
                <Col key={`bird_${data['id']}`} span={5} className="app-post-info" style={{ cursor: 'pointer' }} onClick={() => { this.goToAccessory(data['id']) }}>
                    <div className="app-col-post-item" style={{
                        boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030'
                    }}>
                        <img className="app-post-short-img"
                            src={data.media[0]?.url} alt=''
                            style={{ maxHeight: 300, maxWidth: 230, minHeight: 300, minWidth: 230 }} />
                        <div className="app-post-short-detail">
                            <span className="app-post-title" style={{ color: objectMapping.style.color, fontWeight: objectMapping.style.fontWeight }}>
                                {objectMapping.style.markIcon ? <StarOutlined /> : ''} {objectMapping.style.isUpper ? data['title'].toUpperCase() : data['title']}
                            </span>
                            <div className="app-desciption app-text-overflow-line-3" style={{
                                maxHeight: 73.6
                            }}>{data['description']}</div>
                            <span>
                                Giá: <NumericFormat thousandSeparator=',' value={data['price']} displayType='text' suffix=" ₫" />
                            </span>
                            <span className="app-post-location">
                                <EnvironmentOutlined /> {data['address']}
                            </span>
                            <span >
                                Đăng {data['postTransaction']['effectDate'] ? moment(data['postTransaction']['effectDate']).fromNow() : ''}
                            </span>
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                    <Avatar
                                        src={require('../../assets/images/guest-avatar.png')}
                                        shape="circle"
                                        size={28}
                                    ></Avatar>
                                </div>
                                <div style={{ padding: 7 }}></div>
                                <div style={{ display: 'flex', alignItems: 'center' }} >
                                    <span style={{ fontWeight: 500 }}>
                                        {data.nameSeller}
                                    </span>
                                </div>
                            </div>
                            <span >
                                Liên hệ: <Tag color='cyan-inverse'>{data.phoneSeller}</Tag>
                            </span>
                        </div>
                    </div>
                </Col>
            );
            let gap = (<Divider />);
            nodes.push(post);
            nodes.push(gap);
        }
        return (
            <>{nodes}</>
        )
    }

    private onFilterDataStateChange(property: string, value: string): void {
        let _filter = this.state.filter as any;
        switch (property) {
            case 'AccessoryType':
                _filter.AccessoryType = value;
                break;
            case 'lowestPrice':
                _filter.lowestPrice = value;
                break;
            case 'highestPrice':
                _filter.highestPrice = value;
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

    private onClearSearch(): void {
        let _filter = {
            accessoryType: '',
            lowestPrice: '',
            highestPrice: '',
            packageType: ''
        }
        this.setState({
            isDisableButtonSearch: true,
            filter: _filter
        });
        //this.getListAccessoryPost();
    }

    private onSearchAccessory(): void {
        this.setState({
            isDataLoading: true
        });
        this.coreService.getAccessoryListOnFilter(this.state.filter).then(data => {
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

    private goToAccessory(id: string): void {
        CommonUtility.redirectTo(`/accessory/${id}`);
    }
}