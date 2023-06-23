import { Button, Col, DatePicker, Input, Modal, Row } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";
import CoreServices from "../../../services/data.services";
import { IUserInfo } from "../../CommonComponents/AppInterfaces";
import { cloneDeep } from "lodash";
import { RightOutlined, PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import { CommonUtility } from "../../../utilities/utilities";
import { AdminService } from "../AdminService";



interface IPackDetailProps {
    id: string;
    isOpen: boolean;
    onCancel: any;
    onSave: any;
    // onReject: any;
    currentUser: IUserInfo;
}

interface IPackDetailState {
    id: string;
    queue: number;
    title?: string;
    expiredDay: string;
    createDate: string;
    updateDate: string;
    totalPackPrice: number;
    packPrices: any;
    packPricePackage: Array<IPackPrices>;
    isOpenAddPostTrans: boolean;
    currentUser: any;
    packPriceView?: string;
    hasDataChanged: boolean;
    isCreatePriceForm: boolean;

    newPrice: number,
    newEffectDate: Date | null;
}

interface IPackPrices {
    id: string;
    price: number;
    effectDate?: string;
    packId: string;
}

export class PackDetail extends React.Component<IPackDetailProps, IPackDetailState> {
    public adminService = new AdminService();
    constructor(props: IPackDetailProps) {
        super(props);
        this.state = {
            id: '',
            queue: 0,
            title: '',
            expiredDay: '',
            createDate: '',
            updateDate: '',
            totalPackPrice: 0,
            packPrices: null,
            packPricePackage: [],
            isOpenAddPostTrans: false,
            currentUser: null,
            hasDataChanged: false,
            isCreatePriceForm: false,
            newPrice: 0,
            newEffectDate: null
        }
    }

    componentDidMount(): void {
        this.getPackDetail();
    }

    render(): React.ReactNode {
        return (<>
            <Modal
                open={this.props.isOpen}
                closable={false}
                title='Pack Detail'
                footer={this.getRenderFooterButton()}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: 24 }}>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span><strong>Id:</strong></span>
                        </Col>
                        <Col span={19}>
                            <span><strong>{this.state.id}</strong></span>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span>Title:</span>
                        </Col>
                        <Col span={19}>
                            <Input style={{ width: '95%' }} value={this.state.title} onChange={(args) => {
                                this.setState({
                                    hasDataChanged: true,
                                    title: args.target.value
                                })
                            }}></Input>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span>Queue:</span>
                        </Col>
                        <Col span={19}>
                            <Input style={{ width: '95%' }} value={this.state.queue} disabled></Input>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span>Pack Prices:</span>
                        </Col>
                        <Col span={7}>
                            {
                                !this.state.isCreatePriceForm ?
                                    <Button
                                        type="default"
                                        icon={<PlusOutlined />}
                                        onClick={() => { this.onCreatePackPrice() }}
                                    >
                                        Create new Price
                                    </Button>
                                    : <div style={{ display: 'flex' }}>
                                        <Button
                                            type="primary"
                                            disabled={this.isDisabledButtonSaveNewPrice()}
                                            onClick={() => {
                                                this.onSaveNewPackPrice()
                                            }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            type="default"
                                            style={{ marginLeft: 7 }}
                                            onClick={() => {
                                                this.setState({
                                                    isCreatePriceForm: false
                                                })
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                            }

                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: '#CFCFCF', padding: 8, borderRadius: '4px 4px 0 0' }}>
                        <Col span={10} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span>Price</span>
                        </Col>
                        <Col span={14}>
                            <span>Effect Date</span>
                        </Col>
                    </Row>
                    {this.renderPackPrices()}
                </div>
            </Modal>
        </>)
    }

    private renderPackPrices(): React.ReactNode {
        let packPrices = cloneDeep(this.state.packPrices) as Array<any>;
        let elemNodes: React.ReactNode[] = [];
        if (this.state.isCreatePriceForm) {
            elemNodes.push(
                <Row style={{ backgroundColor: 'transparent', padding: 8 }}>
                    <Col span={10} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <NumericFormat
                            className="app-numeric-input"
                            thousandSeparator=','
                            value={this.state.newPrice}
                            displayType='input'
                            suffix=" ₫"
                            onValueChange={(values) => {
                                this.setState({
                                    newPrice: values.floatValue as number
                                })
                            }} />
                    </Col>
                    <Col span={14}>
                        <DatePicker
                            style={{ width: "97%", marginLeft: "3%" }}
                            format={'DD/MM/YYYY'}
                            placeholder="Select date"
                            onChange={(value) => {
                                this.setState({
                                    newEffectDate: value?.toDate() ? value?.toDate() : null
                                });
                            }}
                        />
                    </Col>
                </Row>
            )
        }
        packPrices?.map((item, index) => {
            let isEvenRow = index % 2 === 0;
            let itemNode = (
                <Row style={{ backgroundColor: isEvenRow ? '#FFFAF0' : '#C6E2FF', padding: 8 }}>
                    <Col span={10} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <NumericFormat thousandSeparator=',' value={item.price} displayType='text' suffix=" ₫" />
                    </Col>
                    <Col span={14}>
                        <span>{moment(item.effectDate).format('MM/DD/YYYY')}</span>
                    </Col>
                </Row>
            )
            elemNodes.push(itemNode);
        })
        return elemNodes;
    }

    private getPackDetail(): void {
        this.adminService.getPackById(this.props.id).then(res => {
            if (res.status) {
                let _rawData = res.response.data;
                this.setState({
                    id: _rawData.id,
                    queue: _rawData.queue,
                    title: _rawData.title,
                    expiredDay: _rawData.expiredDay,
                    totalPackPrice: _rawData.totalPackPrice,
                    packPrices: _rawData.packPrices,
                })
            }
        })
    }

    private getRenderFooterButton(): React.ReactNode[] {
        let nodes: React.ReactNode[] = []
        nodes.push(
            <Button key='cancel' onClick={() => {
                if (this.props.onCancel) {
                    this.props.onCancel()
                }
            }}>Close</Button>
        )
        nodes.push(
            <Button
                disabled={!this.state.hasDataChanged}
                type="primary"
                style={{ backgroundColor: '#00CC00' }} key='save' onClick={() => {
                    if (this.props.onSave) {
                        let dataPost = {
                            queue: this.state.queue,
                            title: this.state.title,
                            expiredDay: this.state.expiredDay
                        }
                        this.props.onSave(dataPost);
                    }
                }}>Save</Button>
        )
        return nodes;
    }

    private isDisabledButtonSaveNewPrice(): boolean {
        if (this.state.newPrice === 0) {
            return true;
        }
        if (CommonUtility.isNullOrUndefined(this.state.newEffectDate)) {
            return true;
        }
        return false;
    }

    private onCreatePackPrice(): void {
        this.setState({
            isCreatePriceForm: true
        })
        //#1 call endpoint create pack price
        //#2 show message if success or fail
        //#3 reload popup if success: call function this.getPackDetail();
    }

    private onSaveNewPackPrice(): void {
        //#1 call endpoint create pack price
        let newPrice = this.state.newPrice;
        let newEffectDate = this.state.newEffectDate;
        let packId = this.props.id;
        let dataPost = {
            price: newPrice,
            effectDate: this.formatEffectDate(newEffectDate as Date),
            packId: packId
        }
        this.adminService.createPackPrice(dataPost).then(res => {
            if (res.status) {
                this.setState({
                    isCreatePriceForm: false,
                    newPrice: 0,
                    newEffectDate: null
                })
                this.getPackDetail();
            }
        })
        //#2 show message if success or fail

        //#3 reload popup if success:


    }

    private formatEffectDate(date: Date): string {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return moment(date).format('yyyy-MM-DD');
    }
}