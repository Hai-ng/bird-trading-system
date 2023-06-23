import { Carousel, Col, Divider, Row } from "antd";
import React from "react";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";
import { IHomePageProps, IHomePageState } from "./IHomePage";
import { NumericFormat } from 'react-number-format';
import CoreServices from "../../services/data.services";
import { CommonUtility } from "../../utilities/utilities";
import { cloneDeep } from "lodash";
import { StarFilled, EnvironmentOutlined } from '@ant-design/icons';
import moment from "moment";
import 'moment/locale/vi';


export class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    public coreService = new CoreServices();
    constructor(props: IHomePageProps) {
        super(props);
        this.state = {
            listPost: [],
            listBirdCage: [],
            listAccessory: [],
            postPackage: [],
            listBanner: []
        }
    }

    componentDidMount(): void {
        moment.locale('vi');
        this.getCategories().then((data: Array<any>) => {
            let birdId = data.filter(item => {
                return item.title === 'Chim Cảnh';
            })[0].id
            let cageId = data.filter(item => {
                return item.title === 'Lồng Chim';
            })[0].id
            let AccessoryId = data.filter(item => {
                return item.title === 'Phụ Kiện';
            })[0].id
            this.getPostPrice();
            this.getTopBirdList(birdId);
            this.getTopBirdCageList(cageId);
            this.getTopAccessoryList(AccessoryId);
            this.getBanner();
        })
    }

    //#region component render
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={1}></HeaderTemplate>
                <div className="App-body-contain">
                    <Carousel autoplay >
                        {
                            this.state.listBanner.map(item => {
                                return (
                                    <div>
                                        <img style={{ width: '100%', maxHeight: 522, minHeight: 522 }} src={item?.media[0]?.url} alt='' />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    <div className="gap-element"></div>

                    {/* <Row>
                        <Divider orientation="center" className="app-divider-home">Tin nổi bật</Divider>
                    </Row>
                    <Row>
                        <div className="App-row-post-info">
                            <Col span={5} className="app-news-info" style={{ cursor: 'pointer' }} onClick={() => { }}>
                                <div className="app-col-post-item">
                                    <img className="app-post-short-img" src={require('../../assets/images/chim_canh/chim_chao_mao.jpg')} alt='' />
                                    <div className="app-post-short-detail">
                                        <span className="app-news-title">
                                            <strong><h2>Giá chào mào tăng đột biến</h2></strong>
                                        </span>

                                        <div className="app-desciption" dangerouslySetInnerHTML={{ __html: desciption }}></div>
                                        <span>Giá trị mua vào hiện tại khoảng <NumericFormat thousandSeparator=',' value={500000} displayType='text' suffix=" ₫" /> trên mỗi cá thể</span>
                                        <NumericFormat thousandSeparator=',' value={} displayType='text' suffix=" ₫" />
                                        <span className="app-post-location">
                                            Nguồn tin tại TP Hồ Chí Minh
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Row> */}

                    <Row>
                        <Divider orientation="center" className="app-divider-home">Chim Cảnh</Divider>
                    </Row>
                    {this.renderPostUI()}
                    <Row>
                        <Divider orientation="center" className="app-divider-home">Lồng Chim</Divider>
                    </Row>
                    {this.renderBirdCageUI()}
                    <Row>
                        <Divider orientation="center" className="app-divider-home">Phụ Kiện</Divider>
                    </Row>
                    {this.renderAccessoryUI()}
                </div>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }

    private getTopBirdList(birdId: string): void {
        this.coreService.getPostListBaseOnCategory(birdId).then(res => {
            if (res.status) {
                this.setState({
                    listPost: res.response.data.data
                })
            }
        })
    }
    private getTopBirdCageList(birdCageId: string): void {
        this.coreService.getPostListBaseOnCategory(birdCageId).then(res => {
            if (res.status) {
                this.setState({
                    listBirdCage: res.response.data.data
                })
            }
        })
    }

    private getTopAccessoryList(accessoryId: string): void {
        this.coreService.getPostListBaseOnCategory(accessoryId).then(res => {
            if (res.status) {
                this.setState({
                    listAccessory: res.response.data.data
                })
            }
        })
    }

    private getBanner(): void {
        this.coreService.getBanner().then(res => {
            if (res.status) {
                this.setState({
                    listBanner: res.response.data.data
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

    private goToDetailPost(id: string, path: string): void {
        CommonUtility.redirectTo(`/${path}/${id}`);
    }

    private renderPostUI(): React.ReactNode {
        let elems: JSX.Element[] = [];
        let _temp = cloneDeep(this.state.listPost);
        let product: any[] = [];
        if (_temp.length < 9) {
            product = _temp;
        } else {
            for (let i = 0; i < 8; i++) {
                product.push(_temp[i]);
            }
        }
        let _postPackage = cloneDeep(this.state.postPackage);
        for (let data of product) {
            let objectMapping = _postPackage.filter(item => {
                return item.queue === data.postTransaction?.queue;
            })[0];
            elems.push(
                <Col key={`bird_${data.id}`} span={5} className="gutter-row" style={{ cursor: 'pointer' }} onClick={() => { this.goToDetailPost(data.id.toString(), 'bird') }}>
                    <div className="app-col-post-item" style={{ minHeight: 420, maxHeight: 420, width: 230 }}>
                        <img className="app-post-short-img"
                            style={{ maxHeight: 300, maxWidth: 230, minHeight: 300, minWidth: 230 }}
                            src={data.media[0]?.url} alt='' />
                        <div className="app-post-short-detail">
                            <span className="app-post-title app-text-overflow-line-2"
                                style={{
                                    color: objectMapping?.style.color,
                                    fontWeight: objectMapping?.style.fontWeight,
                                    maxHeight: 43.2,
                                }}>
                                {objectMapping?.style.markIcon ? <StarFilled style={{ color: '#00F5FF' }} /> : ''} {objectMapping?.style.isUpper ? data['title'].toUpperCase() : data['title']}
                            </span>
                            <span>
                                Giá: <NumericFormat thousandSeparator=',' value={data.price} displayType='text' suffix=" ₫" />
                            </span>
                            <span className="app-post-location app-text-overflow-line-1" style={{ maxHeight: 21.6 }}>
                                <EnvironmentOutlined /> {data['address']}
                            </span>
                            <span >
                                Đăng {data['postTransaction']['effectDate'] ? moment(data['postTransaction']['effectDate']).fromNow() : ''}
                            </span>
                        </div>
                    </div>
                </Col>
            )
        }
        return (
            <>
                <Row gutter={[24, 24]} justify="space-around" align="middle" className="app-row-post">
                    {elems}
                </Row>
            </>
        )
    }

    private renderBirdCageUI(): React.ReactNode {
        // let { listPost } = this.state;
        let elems: JSX.Element[] = [];
        let _temp = cloneDeep(this.state.listBirdCage);
        let product: any[] = [];

        if (_temp.length < 9) {
            product = _temp;
        } else {
            for (let i = 0; i < 8; i++) {
                product.push(_temp[i]);
            }
        }
        let _postPackage = cloneDeep(this.state.postPackage);
        for (let data of product) {
            let objectMapping = _postPackage.filter(item => {
                return item.queue === data.postTransaction?.queue;
            })[0];
            elems.push(
                <Col key={`cage_${data.id}`} span={5} className="gutter-row" style={{ cursor: 'pointer' }} onClick={() => { this.goToDetailPost(data.id.toString(), 'bird') }}>
                    <div className="app-col-post-item" style={{ minHeight: 420, maxHeight: 420, width: 230 }}>
                        <img className="app-post-short-img"
                            style={{ maxHeight: 300, maxWidth: 230, minHeight: 300, minWidth: 230 }}
                            src={data.media[0]?.url} alt='' />
                        <div className="app-post-short-detail">
                            <span className="app-post-title app-text-overflow-line-2"
                                style={{
                                    color: objectMapping?.style.color,
                                    fontWeight: objectMapping?.style.fontWeight,
                                    maxHeight: 43.2,
                                }}>
                                {objectMapping?.style.markIcon ? <StarFilled style={{ color: '#00F5FF' }}/> : ''} {objectMapping?.style.isUpper ? data['title'].toUpperCase() : data['title']}
                            </span>
                            <span>
                                Giá: <NumericFormat thousandSeparator=',' value={data.price} displayType='text' suffix=" ₫" />
                            </span>
                            <span className="app-post-location app-text-overflow-line-1">
                                <EnvironmentOutlined /> {data['address']}
                            </span>
                            <span >
                                Đăng {data['postTransaction']['effectDate'] ? moment(data['postTransaction']['effectDate']).fromNow() : ''}
                            </span>
                        </div>
                    </div>
                </Col>
            )
        }
        return (
            <>
                <Row gutter={[24, 24]} justify="space-around" align="middle" className="app-row-post">
                    {elems}
                </Row>
            </>
        )
    }

    private renderAccessoryUI(): React.ReactNode {
        let elems: JSX.Element[] = [];
        let _temp = cloneDeep(this.state.listAccessory);
        let product: any[] = [];

        if (_temp.length < 9) {
            product = _temp;
        } else {
            for (let i = 0; i < 8; i++) {
                product.push(_temp[i]);
            }
        }
        let _postPackage = cloneDeep(this.state.postPackage);
        for (let data of product) {
            let objectMapping = _postPackage.filter(item => {
                return item.queue === data.postTransaction?.queue;
            })[0];
            elems.push(
                <Col key={`cage_${data.id}`} span={5} className="gutter-row" style={{ cursor: 'pointer' }} onClick={() => { this.goToDetailPost(data.id.toString(), 'bird') }}>
                    <div className="app-col-post-item" style={{ minHeight: 420, maxHeight: 420, width: 230 }}>
                        <img className="app-post-short-img"
                            style={{ maxHeight: 300, maxWidth: 230, minHeight: 300, minWidth: 230 }}
                            src={data.media[0]?.url} alt='' />
                        <div className="app-post-short-detail">
                            <span className="app-post-title app-text-overflow-line-2"
                                style={{
                                    color: objectMapping?.style.color,
                                    fontWeight: objectMapping?.style.fontWeight,
                                    maxHeight: 43.2,
                                }}>
                                {objectMapping?.style.markIcon ? <StarFilled style={{ color: '#00F5FF' }}/> : ''} {objectMapping?.style.isUpper ? data['title'].toUpperCase() : data['title']}
                            </span>
                            <span>
                                Giá: <NumericFormat thousandSeparator=',' value={data.price} displayType='text' suffix=" ₫" />
                            </span>
                            <span className="app-post-location app-text-overflow-line-1">
                                <EnvironmentOutlined /> {data['address']}
                            </span>
                            <span >
                                Đăng {data['postTransaction']['effectDate'] ? moment(data['postTransaction']['effectDate']).fromNow() : ''}
                            </span>
                        </div>
                    </div>
                </Col>
            )
        }
        return (
            <>
                <Row gutter={[24, 24]} justify="space-around" align="middle" className="app-row-post">
                    {elems}
                </Row>
            </>
        )
    }
}
