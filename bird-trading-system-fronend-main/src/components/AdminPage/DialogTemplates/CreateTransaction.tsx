import { Button, Col, Input, Modal, Row, Select } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { NumericFormat } from "react-number-format";
import { CommonUtility } from "../../../utilities/utilities";
import { CommonProps } from "../../CommonComponents/AppInterfaces";
import { AdminService } from "../AdminService";

interface ICreateTransactionlProps extends CommonProps {
    isOpen: boolean;
    onCancel: any;
    onApprove: any;

}

interface ICreateTransactionlState {
    paymentType: number
    money: number;
    userId: string;
    description?: string;
}

export class CreateTransaction extends React.Component<ICreateTransactionlProps, ICreateTransactionlState> {

    public adminService = new AdminService();

    constructor(props: ICreateTransactionlProps) {
        super(props);
        this.state = {
            paymentType: 1,
            money: 0,
            userId: '',
            description: ''
        }
    }

    render(): React.ReactNode {
        return (<>
            <Modal
                open={this.props.isOpen}
                closable={false}
                title='New Transaction'
                footer={this.getRenderFooterButton()}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: 24 }}>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Payment Type: <span style={{ color: 'red' }}>*</span></span>
                        </Col>
                        <Col span={16}>
                            <Select
                                style={{ width: '90%' }}
                                value={this.state.paymentType}
                                onChange={(value) => {
                                    this.setState({
                                        paymentType: value
                                    })
                                }}
                                options={[
                                    { label: 'Desposit', value: 1 },
                                    { label: 'Withdraw', value: 0 },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Money: <span style={{ color: 'red' }}>*</span></span>
                        </Col>
                        <Col span={16}>
                            <NumericFormat
                                className="app-numeric-input"
                                style={{ width: "90%" }}
                                thousandSeparator=','
                                value={this.state.money}
                                onValueChange={(values) => {
                                    this.setState({
                                        money: values.floatValue as number
                                    });
                                }}
                                displayType='input'
                                suffix=" ₫" />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                            <span>User: <span style={{ color: 'red' }}>*</span></span>
                        </Col>
                        <Col span={16}>
                            <AppUserSelect
                                openMessage={this.props.openMessage}
                                destroyMessage={this.props.destroyMessage}
                                onChanged={(value) => {
                                    this.setState({
                                        userId: value
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Description:</span>
                        </Col>
                        <Col span={16}>
                            <Input
                                style={{ width: "90%" }}
                                placeholder="Input description"
                                value={this.state.description}
                                onChange={(args) => {
                                    this.setState({
                                        description: args.target.value
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>)
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

        nodes.push(
            <Button
                type="primary"
                style={{ backgroundColor: '#00CC00' }}
                key='confirm'
                onClick={() => {
                    if (this.props.onApprove) {
                        let data = cloneDeep(this.state);
                        this.props.onApprove(data);
                    }
                }}
                disabled={this.validateButtonSubmit()}
            >Submit</Button>
        )
        return nodes;
    }

    public validateButtonSubmit(): boolean {
        let objRequired = {
            paymentType: this.state.paymentType,
            money: this.state.money,
            userId: this.state.userId
        }
        for (let item in objRequired) {
            if (CommonUtility.isNullOrEmpty((objRequired as any)[item])) {
                return true;
            }
            if (item === 'money' && objRequired['money'] === 0) {
                return true;
            }
        }
        return false;
    }
}

interface IAppUserSelectProps extends CommonProps {
    onChanged: (args: any) => void
}

interface IAppUserSelectState {
    arrayUser: Array<{ label: string, value: string }>;
}

class AppUserSelect extends React.Component<IAppUserSelectProps, IAppUserSelectState> {
    public adminService = new AdminService();
    constructor(props: IAppUserSelectProps) {
        super(props);
        this.state = {
            arrayUser: []
        }
    }

    componentDidMount(): void {
        this.getListUser().then(data => {
            let arraySelected = this.bindingDataUser(data);
            this.setState({
                arrayUser: arraySelected
            })
        })
    }

    render(): React.ReactNode {
        return (
            <Select
                options={this.state.arrayUser}
                placeholder='Select user'
                style={{ width: '90%' }}
                onChange={(args) => {
                    this.props.onChanged(args);
                }}
            />
        )
    }

    private getListUser(): Promise<any> {
        return new Promise(resolve => {
            this.adminService.getListAllUser().then(res => {
                if (res.status) {
                    resolve(res.response.data.data);
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
        })
    }

    private bindingDataUser(arrUser: Array<any>): Array<{ label: string, value: string }> {
        let data = arrUser.map(item => {
            return {
                label: `${item.username} (${item.lastName} ${item.firstName})`,
                value: item.id
            }
        })
        return data;
    }
}