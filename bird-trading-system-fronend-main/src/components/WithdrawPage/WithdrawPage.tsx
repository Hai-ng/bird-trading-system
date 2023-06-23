import { Button, Col, Divider, Form, Input, Row, Steps, Typography } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";
import CoreServices from "../../services/data.services";
import { CommonUtility } from "../../utilities/utilities";
import { FooterTemplate } from "../CommonComponents/Footer";
import { HeaderTemplate } from "../CommonComponents/Header";
import { IWithdrawPageProps, IWithdrawPageState } from "./IWithdrawPage";


export class WithdrawPage extends React.Component<IWithdrawPageProps, IWithdrawPageState> {
    public coreService = new CoreServices();
    constructor(props: IWithdrawPageProps) {
        super(props);
        this.state = {
            currentStep: 0,
            currentUser: null,
            withdraw: 0,
            bankName: '',
            bankNumber: '',
            bankUser: '',
            withdrawCode: '',
            isDisableBtnNext: true
        }
    }

    componentDidMount(): void {
        let user = localStorage.getItem('currentUser');
        if (CommonUtility.isNullOrUndefined(user)) {
            CommonUtility.redirectTo('/login');
        } else {
            let objUser = JSON.parse(user as string)
            this.setState({
                currentUser: objUser,
            });
            this.getWithdrawCode();
        }
    }

    render(): React.ReactNode {
        return (
            this.state.currentUser ?
                <div>
                    <HeaderTemplate activeTab={0}></HeaderTemplate>
                    <div className="App-body-contain">
                        <div className="gap-element"></div>
                        <Row style={{ justifyContent: 'center' }}>
                            <Col span={20}>
                                <Steps current={this.state.currentStep} items={itemStep} style={{ marginBottom: 32 }} />

                                <div className="app-step-withdraw-content">
                                    {
                                        this.state.currentStep === 0 ?
                                            <div
                                                style={{
                                                    height: "300px",
                                                    width: "100%",
                                                    marginTop: "10px",
                                                    marginBottom: "10px",
                                                    backgroundColor: "#d8ffd8",
                                                    borderRadius: "10px"
                                                }}
                                            >
                                                <div style={{ padding: "20px" }}>
                                                    <Divider orientation="left" className="app-divider-create-post">
                                                        Rút tiền
                                                    </Divider>
                                                    <Form
                                                        labelCol={{ span: 3 }}
                                                        layout="horizontal"
                                                        style={{ width: "90%", marginLeft: "5%" }}
                                                    >
                                                        <Form.Item label='Số tiền muốn rút:'
                                                            style={{ marginTop: 64 }}
                                                        >
                                                            <NumericFormat value={this.state.withdraw} suffix=" ₫" thousandSeparator=',' displayType="input" className="app-numeric-input" onValueChange={(values) => {
                                                                this.onWithdrawDataStateChange(values.floatValue as number);
                                                            }}
                                                            // value={this.state.withdraw}

                                                            />
                                                        </Form.Item>
                                                        <Form.Item label="Số dư:" >
                                                            <Text>
                                                                <NumericFormat value={this.state.currentUser.balance} thousandSeparator=',' displayType='text' suffix=" ₫" />
                                                            </Text>
                                                        </Form.Item>
                                                        {
                                                                this.checkBalanceInvalid() ? 
                                                                <span style={{ color: 'red', marginLeft: '7%' }}>Số dư của bạn không đủ để rút</span>
                                                                : <></>
                                                            }
                                                        {/* <FormControlLabel style={{ marginLeft: "12%" }}
                                                        control={<Checkbox value="accept" />}
                                                        label="Đồng ý với điều khoản"
                                                    /> */}
                                                    </Form>
                                                </div>

                                            </div> : <></>
                                    }
                                    {
                                        this.state.currentStep === 1 ?
                                            <div
                                                style={{
                                                    height: "300px",
                                                    width: "100%",
                                                    marginTop: "10px",
                                                    marginBottom: "10px",
                                                    backgroundColor: "#d8ffd8",
                                                    borderRadius: "10px"
                                                }}
                                            >
                                                <div style={{ padding: "20px" }}>
                                                    <Divider orientation="left" className="app-divider-create-post">
                                                        Tài khoản thụ hưởng
                                                    </Divider>
                                                    <div style={{ margin: 24, border: '1px solid', borderRadius: 8, padding: '16px 24px 16px 16px', display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
                                                            <Form labelCol={{ span: 4 }}
                                                                layout="horizontal"
                                                                style={{ width: "90%", marginLeft: "5%" }}>

                                                                <Form.Item label="Số tài khoản: " required>
                                                                    <Input style={{ width: "90%", marginLeft: "2%" }}
                                                                        placeholder="Nhập số tài khoản"
                                                                        onChange={(value) => {
                                                                            this.onBankNumberDataStateChange(value.target.value);
                                                                        }}
                                                                    >
                                                                    </Input>
                                                                </Form.Item>

                                                                <Form.Item label="Tên người thụ hưởng: " required>
                                                                    <Input style={{ width: "90%", marginLeft: "2%" }}
                                                                        placeholder="Nhập tên người thụ hưởng"
                                                                        onChange={(value) => {
                                                                            this.onBankUserDataStateChange(value.target.value);
                                                                        }}
                                                                    >
                                                                    </Input>
                                                                </Form.Item>

                                                                <Form.Item label="Ngân hàng thụ hưởng: " required>
                                                                    <Input style={{ width: "90%", marginLeft: "2%" }}
                                                                        placeholder="Nhập ngân hàng"
                                                                        onChange={(value) => {
                                                                            this.onBankNameDataStateChange(value.target.value);
                                                                        }}>
                                                                    </Input>
                                                                </Form.Item>
                                                            </Form>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div> : <></>
                                    }
                                    {
                                        this.state.currentStep === 2 ?
                                            <div
                                                style={{
                                                    height: "310px",
                                                    width: "100%",
                                                    marginTop: "10px",
                                                    marginBottom: "10px",
                                                    backgroundColor: "#d8ffd8",
                                                    borderRadius: "10px"
                                                }}
                                            >
                                                <div style={{ padding: "20px" }}>
                                                    <Divider orientation="left" className="app-divider-create-post">
                                                        Xác nhận
                                                    </Divider>
                                                    <Form
                                                        labelCol={{ span: 3 }}
                                                        layout="horizontal"
                                                        style={{ width: "90%", marginLeft: "5%" }}
                                                    >
                                                        <div style={{ margin: 24, padding: '16px 24px 16px 16px', display: 'flex', flexDirection: 'column' }}>
                                                            <span><strong>Bước cuối cùng.</strong></span>
                                                            <span>Sau khi nhấn nút xác nhận, yêu câu của bạn sẽ được gửi về hệ thống.</span>
                                                            <span>Vui lòng chờ xét duyệt từ ban quản trị. Sau khi yêu cầu của bạn được phê duyệt, tiền sẽ được cập nhận vào số dư</span>
                                                            <span>Mọi thắc mắc xin liên hệ qua email: kienadmin@gmail.com</span>
                                                        </div>
                                                    </Form>
                                                </div>

                                            </div> : <></>
                                    }
                                </div>
                                <div className="app-group-button">
                                    <Button
                                        type="default"
                                        onClick={() => {
                                            if (this.state.currentStep === 0) {
                                                CommonUtility.redirectTo('/home');
                                                return;
                                            }
                                            let _currentStep = this.state.currentStep;
                                            _currentStep--;
                                            this.setState({
                                                currentStep: _currentStep
                                            })
                                        }}
                                    >
                                        {this.state.currentStep === 0 ? 'Huỷ' : 'Trở về'}
                                    </Button>
                                    <Button
                                        type="primary"
                                        disabled={this.validateButtonNext()}
                                        onClick={() => {
                                            let _currentStep = this.state.currentStep;
                                            if (_currentStep < 2) {
                                                _currentStep++;
                                                this.setState({
                                                    currentStep: _currentStep
                                                })
                                            } else {
                                                this.sendRequest();
                                            }

                                        }}
                                    >
                                        {this.state.currentStep === 2 ? 'Xác nhận' : 'Tiếp tục'}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <FooterTemplate></FooterTemplate>
                </div>
                : <></>
        )
    }

    private validateButtonNext(): boolean {
        if (this.state.currentStep === 0) {
            if (CommonUtility.isNullOrEmpty(this.state.withdraw) || this.state.withdraw === 0) {
                return true;
            }
        }
        if (this.state.currentStep === 1) {
            if (CommonUtility.isNullOrEmpty(this.state.bankNumber)) {
                return true;
            }
            if (CommonUtility.isNullOrEmpty(this.state.bankName)) {
                return true;
            }
            if (CommonUtility.isNullOrEmpty(this.state.bankUser)) {
                return true;
            }
        }
        if (this.checkBalanceInvalid()) {
            return true;
        }
        return false;
    }

    private onWithdrawDataStateChange(value: number): void {
        let isShowButton = false;
        if (!CommonUtility.isNullOrEmpty(value) && value > 0 && this.state.currentUser?.balance as number >= value) {
            isShowButton = true;
        }
        this.setState({
            withdraw: value,
            isDisableBtnNext: !isShowButton
        });
    }

    private checkBalanceInvalid(): boolean {
        return this.state.withdraw > (this.state.currentUser?.balance as number)
    }

    private onBankNameDataStateChange(value: string): void {
        let isShowButton = false;
        if (!CommonUtility.isNullOrEmpty(value)) {
            isShowButton = true;
        }
        // else () => {
        //     isShowButton = true;
        // }
        this.setState({
            bankName: value,
            isDisableBtnNext: !isShowButton
        });
    }

    private onBankUserDataStateChange(value: string): void {
        let isShowButton = false;
        if (!CommonUtility.isNullOrEmpty(value)) {
            isShowButton = true;
        }
        this.setState({
            bankUser: value,
            isDisableBtnNext: !isShowButton
        });
    }

    private onBankNumberDataStateChange(value: string): void {
        let isShowButton = false;
        if (!CommonUtility.isNullOrEmpty(value)) {
            isShowButton = true;
        }
        this.setState({
            bankNumber: value,
            isDisableBtnNext: !isShowButton
        });
    }

    private getWithdrawCode(): void {
        let code = 'BTS';
        let time = new Date().getTime().toString();
        code += time;
        this.setState({
            withdrawCode: code
        })
    }

    private sendRequest(): void {
        let dataPost = {
            money: this.state.withdraw,
            userId: this.state.currentUser?.id,
            paymentType: 0,
            description: `Bank No:  ${this.state.bankNumber} - Bank User: ${this.state.bankUser} - Bank Name: ${this.state.bankName}`
        }
        this.coreService.sendRequestWithdraw(dataPost).then((res: any) => {
            let noti_id = `withdraw_${new Date().getTime()}`
            if (res.status) {
                this.props.openMessage('success', 'Đã gửi yêu cầu thành công.', 3, noti_id);
                setTimeout(() => {
                    this.props.destroyMessage(noti_id);
                    CommonUtility.redirectTo('/home');

                }, 3000);
                return;
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
            this.props.openMessage('error', 'Đã xảy ra lỗi trong lúc tạo yêu cầu. Vui lòng tải lại trang và thử lại.', 3);
            return;
        }).catch((error: any) => {
            this.props.openMessage('error', 'Đã xảy ra lỗi trong lúc tạo yêu cầu. Vui lòng tải lại trang và thử lại.', 3);
        });
    }
}

const itemStep = [
    {
        key: '1',
        title: 'Bước 1',
    },
    {
        key: '2',
        title: 'Bước 2'
    },
    {
        key: '3',
        title: 'Bước 3'
    }
]

const { Text } = Typography;