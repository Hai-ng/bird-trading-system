import { Button, Col, Divider, Row, Tag, Tooltip } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { NumericFormat } from "react-number-format";
import CoreServices from "../../../services/data.services";
import { CommonUtility } from "../../../utilities/utilities";
import { FooterTemplate } from "../../CommonComponents/Footer";
import { HeaderTemplate } from "../../CommonComponents/Header";
import { StarOutlined, RightOutlined, PlusOutlined, RetweetOutlined } from '@ant-design/icons';
import { RouteComponentProps } from "react-router-dom";
import moment from "moment";
import { PostStatusMapping, PostStatusMappingStyle } from "../../CommonComponents/PostStatusMapping";
import { CommonProps } from "../../CommonComponents/AppInterfaces";
import { AddPostTransaction } from "../../CommonComponents/Dialogs/AddPostTransaction";

interface IPostHistoryDetailPageProps extends RouteComponentProps, CommonProps {
}

interface IPostHistoryDetailPageState {
    isDataLoading: boolean;
    PostHistoryDetail: any;
    postPackage: Array<any>;
    postTransactionView?: string;

    isOpenAddPostTrans: boolean;
    currentUser: any;
}

export class PostHistoryDetailPage extends React.Component<IPostHistoryDetailPageProps, IPostHistoryDetailPageState> {
    public coreService = new CoreServices();

    constructor(props: IPostHistoryDetailPageProps) {
        super(props);
        this.state = {
            isDataLoading: true,
            PostHistoryDetail: null,
            postPackage: [],
            postTransactionView: '',
            isOpenAddPostTrans: false,
            currentUser: null
        }
    }
    componentDidMount(): void {
        let user = localStorage.getItem('currentUser');
        if (CommonUtility.isNullOrUndefined(user)) {
            CommonUtility.redirectTo('/login');
        } else {
            this.setState({
                currentUser: JSON.parse(user as string)
            });
            setTimeout(() => {
                this.getPostPrice();
                this.getPostHistoryDetail();
            }, 500);
        }

    }

    render(): React.ReactNode {
        let _postPackage = cloneDeep(this.state.postPackage);
        let activeTransaction = this.state.PostHistoryDetail?.postTransactions.filter((item: any) => {
            return item.isCancel === false
        });
        let objectMapping;
        if (activeTransaction?.length > 0) {
            objectMapping = _postPackage.filter(item => {
                return item.queue === activeTransaction[0].queue;
            })[0];
        } else {
            objectMapping = _postPackage.filter(item => {
                return item.queue === this.state.PostHistoryDetail?.postTransactions[0].queue;
            })[0];
        }
        // let objectMapping = _postPackage.filter(item => {
        //     return item.queue === this.state.PostHistoryDetail?.postTransactions[0]?.queue;
        // })[0];
        return (
            <div>
                <HeaderTemplate activeTab={0}></HeaderTemplate>
                <div className="App-body-contain" style={{ marginBottom: 10, marginTop: 10 }}>
                    <Row style={{
                        width: '80%',
                        marginLeft: '10%',
                        backgroundColor: '#F5F5F5',
                        boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
                        marginBottom: 0
                    }}>
                        {(!this.state.isDataLoading && objectMapping) ?
                            <div className="App-row-post-info">
                                <Col span={24} className="app-post-info">
                                    <div className="app-col-post-item">
                                        <img className="app-post-short-img" src={this.state.PostHistoryDetail?.medias[0]?.url} alt='' style={{
                                            minHeight: 400, maxHeight: 400, minWidth: 280, maxWidth: 280
                                        }} />
                                        <div className="app-post-short-detail" style={{ padding: 14 }}>
                                            <span className="app-post-title" style={{ color: objectMapping.style.color, fontWeight: objectMapping.style.fontWeight }}>
                                                {objectMapping.style.markIcon ? <StarOutlined /> : ''} {objectMapping.style.isUpper ? this.state.PostHistoryDetail['title'].toUpperCase() : this.state.PostHistoryDetail['title']}
                                            </span>

                                            <Row style={{ marginBottom: 10 }}>
                                                <Col span={3}>
                                                    Thể loại:
                                                </Col>
                                                <Col span={21}>
                                                    <span>{this.state.PostHistoryDetail['category']['title']}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginBottom: 10 }}>
                                                <Col span={3}>
                                                    Mô tả:
                                                </Col>
                                                <Col span={21}>
                                                    <div>{this.state.PostHistoryDetail['description']}</div>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginBottom: 7 }}>
                                                <Col span={3} style={{ display: 'flex', alignItems: 'center' }}>
                                                    Giá:
                                                </Col>
                                                <Col span={21}>
                                                    <NumericFormat
                                                        style={{ width: '50%', marginRight: 15 }}
                                                        className="app-numeric-input"
                                                        thousandSeparator=','
                                                        value={this.state.PostHistoryDetail['price']}
                                                        displayType='input'
                                                        suffix=" ₫" />
                                                    <Tooltip title="Cập nhật giá">
                                                        <Button icon={<RetweetOutlined />} onClick={() => {
                                                            this.onUpdatePost();
                                                        }}></Button>
                                                    </Tooltip>
                                                </Col>


                                            </Row>
                                            <Row style={{ marginBottom: 10 }}>
                                                <Col span={3}>
                                                    Địa chỉ:
                                                </Col>
                                                <Col span={21}>
                                                    <span>{this.state.PostHistoryDetail['address']}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginBottom: 10 }}>
                                                <Col span={3}>
                                                    Người bán:
                                                </Col>
                                                <Col span={21}>
                                                    <span>{this.state.PostHistoryDetail['nameSeller']}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginBottom: 10 }}>
                                                <Col span={3}>
                                                    Liên hệ:
                                                </Col>
                                                <Col span={21}>
                                                    <Tag color='lime'>{this.state.PostHistoryDetail['phoneSeller']}</Tag>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginBottom: 10 }}>
                                                <Col span={3}>
                                                    Trạng thái:
                                                </Col>
                                                <Col span={21}>
                                                    <Tag color={(PostStatusMappingStyle as any)[this.state.PostHistoryDetail?.statusMapping]}>
                                                        {(PostStatusMapping as any)[this.state.PostHistoryDetail?.statusMapping]}
                                                    </Tag>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginBottom: 10 }}>
                                                <Col span={3}>
                                                    <span style={{ fontStyle: 'italic' }}>Ngày đăng:</span>
                                                </Col>
                                                <Col span={21}>
                                                    <span style={{ fontStyle: 'italic' }}>
                                                        {moment(this.state.PostHistoryDetail?.createDate).format('MM/DD/YYYY, h:mm:ss A')}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div style={{ padding: 14 }}></div>
                                    <Row>
                                        <Col span={8}>
                                            <Divider orientation="left" style={{ margin: 0 }}>Gói đã dùng:</Divider>
                                            {this.renderPostTransaction()}
                                        </Col>
                                        <Divider type="vertical" style={{ margin: '16px 12px 12px', height: 'auto' }}></Divider>
                                        <Col span={15}>
                                            <Divider orientation="left" style={{ margin: 0 }}>Chi tiết:</Divider>
                                            {this.renderPostTransactionDetail()}
                                        </Col>
                                    </Row>

                                </Col>
                            </div>
                            : <div></div>
                        }

                    </Row>
                    {
                        this.state.isOpenAddPostTrans ?
                            <AddPostTransaction
                                isOpen={this.state.isOpenAddPostTrans}
                                isShowCancelBtn={true}
                                isShowOkBtn={true}
                                onCancel={this.onCancelAddPostTrans}
                                onOk={this.onAddPostTrans}

                                title={this.state.PostHistoryDetail.statusMapping === 'approved' ? 'Thay đổi gói' : 'Thêm gói mới'}
                                currentUser={this.state.currentUser}
                            />
                            : <></>
                    }

                </div>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }

    private onAddPostTrans = (data: any) => {
        let activePack = this.state.PostHistoryDetail.postTransactions.filter((item: any) => {
            return item.isCancel === false;
        });
        data['postId'] = (this.props.match.params as any)['id'];
        if (activePack.length === 0) {
            this.activeNewPacke(data);
        } else {
            let postTransId = activePack[0].id;
            this.cancelPostTransaction(postTransId).then(res => {
                if (res) {
                    this.activeNewPacke(data);
                }
            })
        }
    }

    private activeNewPacke(data: any): void {
        this.coreService.addNewPostTransaction(data).then(res => {
            if (res.status) {
                this.setState({
                    isOpenAddPostTrans: false
                });
                this.getPostHistoryDetail();
            }
        })
    }

    private cancelPostTransaction(transId: string): Promise<boolean> {
        return new Promise(resolve => {
            this.coreService.cancelPostTransaction(transId).then(res => {
                resolve(res.status);
            })
        })
    }

    private onCancelAddPostTrans = () => {
        this.setState({
            isOpenAddPostTrans: false
        })
    }

    private renderPostTransaction(): React.ReactNode {
        let postTransactions = cloneDeep(this.state.PostHistoryDetail?.postTransactions);
        let elemNodes: React.ReactNode[] = [];
        for (let item of postTransactions) {
            let packageName = this.state.postPackage.filter(pack => {
                return pack.id === item.packId
            })[0]?.title ?? '';
            elemNodes.push(
                <div key={`post_transaction_${item.id}`}
                    style={{
                        padding: 10,
                        margin: 14,
                        display: "flex",
                        border: '1px solid',
                        borderRadius: 4,
                        cursor: this.state.postTransactionView !== item.id ? 'pointer' : 'default',
                        backgroundColor: this.state.postTransactionView === item.id ? (item.isCancel ? '#CDCDB4' : '#7CCD7C') : (item.isCancel ? '#FFFFE0' : '#98FB98')
                    }}
                    onClick={() => {
                        if (this.state.postTransactionView !== item.id) {
                            this.setState({
                                postTransactionView: item.id
                            })
                        }
                    }}
                >
                    <span style={{ width: '90%', paddingLeft: 10, fontWeight: 500 }}>{packageName}</span>
                    <RightOutlined style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} />
                </div>
            )
        }
        if (this.state.PostHistoryDetail.statusMapping !== 'denied') {
            elemNodes.push(
                <Button
                    icon={<PlusOutlined />}
                    onClick={() => {
                        this.setState({
                            isOpenAddPostTrans: true
                        })
                    }}
                    style={{
                        margin: 14,
                    }}
                >{this.state.PostHistoryDetail.statusMapping === 'approved' ? 'Thay đổi gói' : 'Thêm gói mới'}</Button>
            )
        }

        return (<>{elemNodes}</>)
    }

    private renderPostTransactionDetail(): React.ReactNode {
        if (this.state.postTransactionView === '') {
            return <></>
        }
        let postTransaction = this.state.PostHistoryDetail.postTransactions.filter((item: any) => {
            return item.id === this.state.postTransactionView;
        })[0] ?? null;
        if (CommonUtility.isNullOrUndefined(postTransaction)) {
            return <></>
        }
        let packMapping = this.state.postPackage.filter(pack => {
            return pack.id === postTransaction.packId
        })[0]
        return (
            <div style={{ margin: 14, }}>
                <Row style={{ marginBottom: 14 }}>
                    <Col span={5}>
                        Tên gói:
                    </Col>
                    <Col span={19}>
                        <span>{packMapping.title}</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 14 }}>
                    <Col span={5}>
                        Số ngày đăng:
                    </Col>
                    <Col span={19}>
                        <span>{postTransaction.expiredDay}</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 14 }}>
                    <Col span={5}>
                        Ngày đăng bài:
                    </Col>
                    <Col span={19}>
                        <span>
                            {moment(postTransaction.effectDate).format('MM/DD/YYYY, h:mm:ss A')}
                        </span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 14 }}>
                    <Col span={5}>
                        Ngày hết hạn:
                    </Col>
                    <Col span={19}>
                        <span>
                            {moment(this.getExpiredDate(postTransaction.expiredDay, new Date(postTransaction.effectDate))).format('MM/DD/YYYY, h:mm:ss A')}
                        </span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 14 }}>
                    <Col span={5}>
                        Tổng thanh toán:
                    </Col>
                    <Col span={19}>
                        <NumericFormat thousandSeparator=',' value={postTransaction.price} displayType='text' suffix=" ₫" />
                    </Col>
                </Row>
                <Row style={{ marginBottom: 14 }}>
                    <Col span={5}>
                        Tình trạng gói:
                    </Col>
                    <Col span={19}>
                        {this.getPostTransactionStatus(postTransaction)}
                    </Col>
                </Row>
                <Row style={{ marginBottom: 14 }}>
                    <Col span={24}> {
                        postTransaction.isCancel === false ?
                            <Button type="primary" danger style={{ marginRight: 14 }}
                                onClick={() => {
                                    this.cancelPostTransaction((this.state.postTransactionView as string)).then(status => {
                                        if (status) {
                                            this.props.openMessage('success', 'Huỷ gói đăng thành công!.', 3);
                                            this.getPostHistoryDetail();
                                        } else {
                                            this.props.openMessage('error', 'Huỷ gói đăng thất bại. Vui lòng thử lại sau.', 3);
                                        }
                                    })
                                }}
                            >Huỷ gói đăng</Button>
                            : <></>
                    }

                    </Col>

                </Row>
            </div>
        )
    }

    private getPostTransactionStatus(postTransaction: any): React.ReactNode {
        if (postTransaction.isCancel) {
            return <span style={{ fontWeight: 700, color: 'red' }}>Đã sử dụng</span>
        }
        let expiredDate = this.getExpiredDate(postTransaction.expiredDay, new Date(postTransaction.effectDate));
        let toDay = new Date();
        if (toDay > expiredDate) {
            return <span style={{ fontWeight: 700, color: 'red' }}>Đã hết hạn</span>
        }
        return <span style={{ fontWeight: 700, color: '#32CD32' }}>Đang sử dụng</span>
    }

    private getExpiredDate(numberOfDay: number, effectDate: Date): Date {
        let expiredDate = new Date(effectDate?.setDate(effectDate?.getDate() + numberOfDay) as number);
        return expiredDate;
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

    private getPostHistoryDetail(): void {
        let id = (this.props.match.params as any)['id'];
        this.coreService.getPostHistoryById(id).then(res => {

            if (res.status) {
                let dataFormatted = this.formatDataObject(res.response.data.data);
                this.setState({
                    isDataLoading: false,
                    PostHistoryDetail: dataFormatted
                })
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

    private formatDataObject(item: any): any {
        if (item.status === 2) {
            item['statusMapping'] = 'sold';
            item['expiredDate'] = '';
        } else if (item.status === 0) {
            item['statusMapping'] = 'requested';
            item['expiredDate'] = '';
        } else if (item.status === -1) {
            item['statusMapping'] = 'denied';
            item['expiredDate'] = '';
        } else {
            let activePack = item.postTransactions.filter((pack: any) => {
                return pack.isCancel === false;
            })
            if (activePack.length === 0) {
                item['statusMapping'] = 'emptyPack';
                item['expiredDate'] = '';
            }
            let today = new Date();
            let validDate = new Date(activePack[0].validDate);
            if (today > validDate) {
                item['statusMapping'] = 'expired';
                item['expiredDate'] = moment(validDate).format('MM/DD/YYYY, h:mm:ss A');
            }
            item['statusMapping'] = 'approved';
            item['expiredDate'] = moment(validDate).format('MM/DD/YYYY, h:mm:ss A');
        }
        return item;
    }

    private onUpdatePost(): void {
        let data = {
            "title": this.state.PostHistoryDetail.title,
            "description": this.state.PostHistoryDetail.description,
            "price": this.state.PostHistoryDetail.price,
            "address": this.state.PostHistoryDetail.address,
            "categoryId": this.state.PostHistoryDetail.categoryId,
            "userId": this.state.PostHistoryDetail.userId,
            "status": this.state.PostHistoryDetail.status
        }
        this.coreService.updatePost(data).then(res => {
            let noti_id = `recharge_${new Date().getTime()}`
            if (res.status) {
                this.props.openMessage('success', 'Cập nhật bài viết thành công', 3);
            }
            if (res.response.response.status === 401) {
                this.props.openMessage('info', 'Phiên đăng nhập đã hết hạn', undefined, noti_id);
                setTimeout(() => {
                    localStorage.removeItem('currentUser');
                    this.props.destroyMessage(noti_id);
                    CommonUtility.redirectTo('/login');
                }, 3000);
                return;
            }
            this.props.openMessage('error', 'Đã xảy ra lỗi khi cập nhật bài viết. Vui lòng thử lại sau', 3);
            return;
        })
    }
}