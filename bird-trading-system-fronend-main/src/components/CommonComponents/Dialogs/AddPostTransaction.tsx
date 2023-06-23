import { Button, DatePicker, Divider, Form, Modal, Row, Select } from "antd";
import { cloneDeep } from "lodash";
import moment from "moment";
import React, { ReactNode } from "react";
import { NumericFormat } from "react-number-format";
import CoreServices from "../../../services/data.services";
import { CommonUtility } from "../../../utilities/utilities";

interface IAddPostTransactionProps {
    isOpen: boolean;
    onCancel?: any;
    onOk?: any;
    isShowCancelBtn: boolean;
    isShowOkBtn: boolean;
    title: string;
    currentUser: any;
}

interface IAddPostTransactionState {
    isOpenDialog: boolean;
    postPackage: Array<any>;
    unitPrice: number;
    packageId: string;
    postingRangeDate: number;
    postingDate?: Date | null;
}

export class AddPostTransaction extends React.Component<IAddPostTransactionProps, IAddPostTransactionState> {
    public service = new CoreServices();
    constructor(props: IAddPostTransactionProps) {
        super(props);
        this.state = {
            isOpenDialog: true,
            postPackage: [],
            unitPrice: 0,
            packageId: '',
            postingRangeDate: 7,
            postingDate: null
        }
    }

    componentDidMount(): void {
        this.getPostPrice();
    }

    render(): React.ReactNode {
        return (
            <>
                <Modal
                    open={this.props.isOpen && this.state.isOpenDialog}
                    closable={false}
                    title={this.props.title}
                    footer={this.getRenderFooterButton()}
                    width={650}
                >
                    <Form
                        labelCol={{ span: 6 }}
                        layout="horizontal"
                        style={{ width: "90%", marginLeft: "5%" }}
                    >
                        <Form.Item label="Gói Đăng" required>
                            <Select
                                style={{ width: "97%", marginLeft: "3%" }}
                                placeholder="Chọn gói đăng"
                                value={this.state.packageId}
                                options={this.state.postPackage.map(item => {
                                    return {
                                        label: item.title,
                                        value: item.id
                                    }
                                })}
                                onChange={(value) => {
                                    this.setState({
                                        packageId: value
                                    });
                                    this.updateUnitPrice(value);
                                }}
                            ></Select>
                        </Form.Item>
                        <Form.Item label="Số lượng ngày đăng" required>
                            <Select
                                style={{ width: "97%", marginLeft: "3%" }}
                                placeholder="Chọn ngày"
                                defaultValue={7}
                                options={[
                                    { label: "7 ngày", value: 7 },
                                    { label: "15 ngày", value: 15 },
                                    { label: "30 ngày", value: 30 },
                                ]}
                                onChange={(value) => {
                                    this.setState({
                                        postingRangeDate: value
                                    });
                                }}
                            ></Select>
                        </Form.Item>

                        <Form.Item label="Ngày Đăng Tin" required>
                            <DatePicker
                                style={{ width: "97%", marginLeft: "3%" }}
                                format={'DD/MM/YYYY'}
                                placeholder="Chọn ngày đăng"
                                onChange={(value) => {
                                    this.setState({
                                        postingDate: value?.toDate() ? value?.toDate() : null
                                    });
                                }}
                            />
                            <div style={{ width: '97%', marginLeft: '3%', display: "flex" }}>
                                {
                                    this.state.postingRangeDate && this.state.postingDate ?
                                        <span style={{ width: '97%' }} >{this.getMessageExpiredDate()}</span>
                                        : <></>
                                }
                            </div>
                        </Form.Item>
                        <Form.Item label="Đơn giá" style={{ marginBottom: 0 }}>
                            <NumericFormat style={{ width: "97%", marginLeft: "3%", fontWeight: 700 }} thousandSeparator=',' value={this.state.unitPrice} displayType='text' suffix=" ₫" />
                        </Form.Item>
                        <Form.Item label="Thời gian đăng tin" style={{ marginBottom: 0 }}>
                            <span style={{ width: "97%", marginLeft: "3%" }}
                            ><strong>{`${this.state.postingRangeDate} ngày`}</strong></span>
                        </Form.Item>

                        <Divider style={{ margin: 12 }} />

                        <Form.Item label="Thành tiền" style={{ fontWeight: 700, marginBottom: 0 }}>
                            <NumericFormat style={{ width: "97%", marginLeft: "3%", fontWeight: 700 }} thousandSeparator=',' value={this.getToMoney()} displayType='text' suffix=" ₫" />
                        </Form.Item>
                        <Form.Item label="Số dư còn lại" style={{ fontWeight: 100, fontStyle: 'italic' }}>
                            <NumericFormat style={{ width: "97%", marginLeft: "3%", fontWeight: 100, fontStyle: 'italic' }} thousandSeparator=',' value={this.props.currentUser.balance} displayType='text' suffix=" ₫" />
                        </Form.Item>
                    </Form>
                    <Row>
                        <span><em>Lưu ý: Nếu bài đăng của bạn đang có gói được sử dụng, gói hiện tại sẽ bị huỷ.</em></span>
                    </Row>
                </Modal>
            </>
        )
    }

    private getMessageExpiredDate(): React.ReactNode {
        let dateRange = cloneDeep(this.state.postingRangeDate);
        let postingDate = cloneDeep(this.state.postingDate);
        let expiredDate = new Date(postingDate?.setDate(postingDate?.getDate() + dateRange) as number);
        return <em>Bài đăng sẽ hết hạn đến hết ngày {moment(expiredDate).format('DD/MM/yyyy')}.</em>
    }

    private getRenderFooterButton(): ReactNode[] {
        let nodes: React.ReactNode[] = []
        if (this.props.isShowCancelBtn) {
            nodes.push(
                <Button key='cancel' onClick={() => {
                    if (this.props.onCancel) {
                        this.props.onCancel()
                    }
                }}>Huỷ</Button>
            )
        }
        if (this.props.isShowOkBtn) {
            nodes.push(
                <Button key='confirm' type="primary" onClick={() => {
                    if (this.props.onOk) {
                        let dataPost = {
                            price: this.getToMoney(),
                            effectDate: this.formatEffectDate(this.state.postingDate as Date),
                            expiredDay: this.state.postingRangeDate,
                            packId: this.state.packageId,
                        }
                        this.props.onOk(dataPost);
                    }
                }}>Tạo</Button>
            )
        }
        return nodes;
    }

    private formatEffectDate(date: Date): string {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return moment(date).format('yyyy-MM-DD');
    }

    private updateUnitPrice(packageId: string): void {
        let objPack = this.state.postPackage.filter((item: any) => {
            return item.id === packageId
        })[0];
        this.setState({
            unitPrice: objPack.price.price
        })
    }

    private getToMoney(): number {
        let unitPrice = cloneDeep(this.state.unitPrice);
        let postingRangeDate = cloneDeep(this.state.postingRangeDate);

        let totalMoney = unitPrice * postingRangeDate;
        return totalMoney;
    }

    private getPostPrice(): void {
        let postPrice = localStorage.getItem('postPrice');
        let objPacks = JSON.parse(postPrice as string)
        if (!CommonUtility.isNullOrUndefined(postPrice)) {
            this.setState({
                postPackage: objPacks,
                unitPrice: objPacks[0]?.price.price,
                packageId: objPacks[0]?.id,
            });
            return;
        }
        this.service.getPostPrice().then((res: any) => {
            if (res.status) {
                let arrayPacks = this.service.mappingStylePostPack(res.response.data);
                this.setState({
                    postPackage: arrayPacks,
                    unitPrice: arrayPacks[0]?.price.price,
                    packageId: arrayPacks[0]?.id,
                });
                localStorage.setItem('postPrice', JSON.stringify(arrayPacks));
            }
        })
    }
}