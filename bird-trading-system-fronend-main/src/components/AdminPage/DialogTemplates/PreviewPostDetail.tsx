import { Button, Modal, Tag } from "antd";
import React from "react";
import { IUserInfo } from "../../CommonComponents/AppInterfaces";
import { styleMapping } from "../../CommonComponents/StyleMapping.enum";
import { AdminService } from "../AdminService";
import { StarOutlined } from '@ant-design/icons';
import { NumericFormat } from "react-number-format";
import { CommonUtility } from "../../../utilities/utilities";
import moment from "moment";

interface IPreviewPostProps {
    postId: string;
    isOpen: boolean;
    onCancel: any;
    onApprove: any;
    onReject: any;

    currentUser: IUserInfo;
}

interface IPreviewPostState {
    title: string;
    address: string;
    description?: string;
    categoryTitle?: string;
    categoryId?: string;
    status: number;
    media: Array<any>;
    nameSeller: string;
    phoneSeller: string;
    price: number;
    authorInfo?: IUserInfo;
    postTransaction?: IPostTransaction[];

    packs: Array<any>;

}

interface IPostTransaction {
    effectDate: string;
    id: string;
    packId: string;
    queue: string;
    isCancel: boolean;
    expiredDay: number;
    price: number;
}

export class PreviewPostDetail extends React.Component<IPreviewPostProps, IPreviewPostState> {
    private service = new AdminService();
    constructor(props: IPreviewPostProps) {
        super(props);
        this.state = {
            status: 0,
            media: [],
            nameSeller: '',
            phoneSeller: '',
            price: 0,
            title: '',
            categoryId: '',
            categoryTitle: '',
            description: '',
            address: '',
            packs: [],
            postTransaction: []
        }
    }

    componentDidMount(): void {
        this.getPostDetail();
        this.getListPack();
    }

    render(): React.ReactNode {
        let objectMapping = (styleMapping as any)[(this.state.postTransaction as Array<any>)[0]?.queue ?? '6']
        return (
            <>
                <Modal
                    open={this.props.isOpen}
                    closable={false}
                    title='Preview Post'
                    footer={this.getRenderFooterButton()}
                    width={700}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', padding: 24 }}>
                        <span>Post Id: {this.props.postId}</span>
                        {
                            this.state.postTransaction && this.state.postTransaction[0]?.queue.toString() !== '1' ?
                                <div style={{ display: 'flex', flexDirection: 'row', padding: 12, border: '1px solid', borderRadius: 3 }}>
                                    <img style={{ maxHeight: 250, maxWidth: 200 }} src={this.state.media[0]?.url} alt='' />
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: 12, marginLeft: 12 }}>
                                        <span style={{ color: objectMapping.color, fontWeight: objectMapping.fontWeight }}>
                                            {objectMapping.markIcon ? <StarOutlined /> : ''} {objectMapping.isUpper ? this.state.title.toUpperCase() : this.state.title}
                                        </span>
                                        <span>{this.state.description}</span>
                                        <span>Danh mục: {this.state.categoryTitle}</span>
                                        <span>Địa chỉ: {this.state.address}</span>
                                        <span>Người bán: {this.state.nameSeller}</span>
                                        <span>Liên hệ: {<Tag color='cyan-inverse'>{this.state.phoneSeller}</Tag>}</span>
                                        <span>-----------------------</span>
                                        <span>Giá: <NumericFormat thousandSeparator=',' value={this.state.price} displayType='text' suffix=" ₫" /></span>
                                    </div>
                                </div>
                                :
                                <div style={{ display: 'flex', flexDirection: 'row', padding: 12, border: '1px solid', borderRadius: 3 }}>
                                    <img style={{ width: '100%' }} src={this.state.media[0]?.url} alt='' />
                                </div>
                        }

                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
                            <span>Author: {this.state.authorInfo?.lastName} {this.state.authorInfo?.firstName}</span>
                            <span>Email: {this.state.authorInfo?.username}</span>
                            <span>----------------------------------------------------</span>
                            <span><strong>Payment</strong></span>
                            <span>Package: {this.getPackTitleById((this.state.postTransaction as Array<any>)[0]?.packId as string)}</span>
                            <span>Effect Date: {moment((this.state.postTransaction as Array<any>)[0]?.effectDate).format('MM/DD/YYYY, h:mm:ss A')}</span>
                            <span>Number Of Days: {((this.state.postTransaction as Array<any>)[0] as IPostTransaction)?.expiredDay}</span>
                            <span>Price: <NumericFormat thousandSeparator=','
                                value={((this.state.postTransaction as Array<any>)[0] as IPostTransaction)?.price ?? 0}
                                displayType='text' suffix=" ₫" />
                            </span>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    private getPackTitleById(packId: string): string {
        let obj = this.state.packs.filter(item => {
            return item.id === packId;
        });
        if (obj.length === 0) {
            return '';
        }
        return obj[0].title
    }

    private getRenderFooterButton(): React.ReactNode[] {
        let nodes: React.ReactNode[] = []
        nodes.push(
            <Button key='cancel' onClick={() => {
                if (this.props.onCancel) {
                    this.props.onCancel()
                }
            }}>Cancel</Button>
        )
        if (this.state.status === 0) {
            nodes.push(
                <Button type="primary" style={{ backgroundColor: '#DD0000' }} key='reject' onClick={() => {
                    if (this.props.onReject) {
                        this.props.onReject()
                    }
                }}>Reject</Button>
            )
            nodes.push(
                <Button type="primary" style={{ backgroundColor: '#00CC00' }} key='confirm' onClick={() => {
                    if (this.props.onApprove) {
                        this.props.onApprove()
                    }
                }}>Approve</Button>
            )
        }
        return nodes;
    }

    private getListPack(): void {
        this.service.getPostPrice().then(res => {
            if (res.status) {
                let arrayPacks = this.service.mappingStylePack(res.response.data);
                this.setState({
                    packs: arrayPacks
                })
            }
        });
    }

    private getPostDetail(): void {
        this.service.getPostDetail(this.props.postId).then(res => {
            if (res.status) {
                let rawData = res.response.data.data;
                this.setState({
                    title: rawData.title,
                    description: rawData.description,
                    nameSeller: rawData.nameSeller,
                    phoneSeller: rawData.phoneSeller,
                    price: rawData.price,
                    categoryTitle: rawData.category?.title ?? '',
                    status: rawData.status,
                    authorInfo: rawData.user,
                    postTransaction: rawData.postTransactions,
                    media: rawData.medias,
                    address: rawData.address
                })
            }
        })
    }
}