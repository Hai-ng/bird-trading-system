import { Button, Col, Modal, Row } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";
import CoreServices from "../../../services/data.services";
import { CommonUtility } from "../../../utilities/utilities";
import { CommonProps, IUserInfo } from "../../CommonComponents/AppInterfaces";
import { PaymentTypeMapping } from "../MappingData/PaymentTypeMapping";
import { TransStatusMapping } from "../MappingData/TransactionStatusMapping";

interface ITransactionDetailProps extends CommonProps {
    transactionId: string;
    isOpen: boolean;
    onCancel: any;
    onApprove: any;
    onReject: any;

    currentUser: IUserInfo;
}

interface ITransactionDetailState {
    description: string;
    paymentType: number;
    money: number;
    username: string;
    balance: number;
    displayName: string;
    status: number;
}


export class TransactionDetail extends React.Component<ITransactionDetailProps, ITransactionDetailState> {
    public coreService = new CoreServices();
    constructor(props: ITransactionDetailProps) {
        super(props);
        this.state = {
            description: '',
            username: '',
            balance: 0,
            displayName: '',
            money: 0,
            paymentType: 0,
            status: 0
        }
    }

    componentDidMount(): void {
        this.getTransactionDetail();
    }

    render(): React.ReactNode {
        return (<>
            <Modal
                open={this.props.isOpen}
                closable={false}
                title='Transaction'
                footer={this.getRenderFooterButton()}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: 24 }}>
                    <span style={{ marginBottom: 10 }}><strong>{(PaymentTypeMapping as any)[this.state.paymentType]}</strong></span>
                    <Row >
                        <Col span={5}>
                            <span style={{ marginBottom: 10 }}>Money: </span>
                        </Col>
                        <Col span={19}>
                            <NumericFormat thousandSeparator=',' value={this.state.money} displayType='text' suffix=" ₫" />
                        </Col>
                    </Row>
                    <Row >
                        <Col span={5}>
                            <span style={{ marginBottom: 10 }}>User: </span>
                        </Col>
                        <Col span={19}>
                            <span>{this.state.username} ({this.state.displayName})</span>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={5}>
                            <span style={{ marginBottom: 10 }}>Balance: </span>
                        </Col>
                        <Col span={19}>
                            <NumericFormat thousandSeparator=',' value={this.state.balance} displayType='text' suffix=" ₫" />
                        </Col>
                    </Row>
                    <Row >
                        <Col span={5}>
                            <span style={{ marginBottom: 10 }}>Description: </span>
                        </Col>
                        <Col span={19}>
                            <span>{this.state.description}</span>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={5}>
                            <span style={{ marginBottom: 10 }}>Status: </span>
                        </Col>
                        <Col span={19}>
                            <span>{(TransStatusMapping as any)[this.state.status]}</span>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>)
    }

    private getTransactionDetail(): void {
        this.coreService.getTransactionById(this.props.transactionId).then(res => {
            if (res.status) {
                let _rawData = res.response.data;
                this.setState({
                    money: _rawData.money,
                    description: _rawData.description,
                    paymentType: _rawData.paymentType,
                    status: _rawData.status,
                    username: _rawData.user.username,
                    displayName: `${_rawData.user.lastName} ${_rawData.user.firstName}`
                });
                this.getUserBalance(_rawData.userId);
            }
        })
    }

    private getUserBalance(userId: string): void {
        this.coreService.getUserInfoById(userId, this.props.currentUser.token as string).then(res => {
            let noti_id = `recharge_${new Date().getTime()}`
            if (res.status) {
                let balance = res.data.data.data.balance;
                this.setState({
                    balance: balance
                })
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
            this.props.openMessage('error', 'Đã xảy ra lỗi khi lấy số dư.', 3);
            return;
        })
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
}