import { Col, Divider, Form, Row } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";
import CoreServices from "../../services/data.services";
import { CommonUtility } from "../../utilities/utilities";
import { FooterTemplate } from "../CommonComponents/Footer";
import { HeaderTemplate } from "../CommonComponents/Header";
import { IRechargePageProps, IRechargePageState } from "./IRechargePage";


export class RechargePage extends React.Component<IRechargePageProps, IRechargePageState> {
    public coreService = new CoreServices();
    constructor(props: IRechargePageProps) {
        super(props);
        this.state = {
            currentStep: 1,
            currentUser: null,
            recharge: 0,
            rechargeCode: '',
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
            this.getRechargeCode();
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
                                {/* <Steps current={this.state.currentStep} items={itemStep} style={{ marginBottom: 32 }} /> */}

                                <div className="app-step-recharge-content">
                                    {
                                        this.state.currentStep === 0 ?
                                            <div
                                                style={{
                                                    height: "330px",
                                                    width: "100%",
                                                    marginTop: "10px",
                                                    marginBottom: "10px",
                                                    backgroundColor: "#d8ffd8",
                                                    borderRadius: "10px"
                                                }}
                                            >
                                                <div style={{ padding: "20px" }}>
                                                    <Divider orientation="left" className="app-divider-create-post">
                                                        Nạp tiền vào ví
                                                    </Divider>
                                                    <Form
                                                        labelCol={{ span: 3 }}
                                                        layout="horizontal"
                                                        style={{ width: "90%", marginLeft: "5%" }}
                                                    >
                                                        <Form.Item label='Số tiền muốn nạp:'
                                                            style={{ marginTop: 64 }}
                                                        >
                                                            <NumericFormat value={this.state.recharge} suffix=" ₫" thousandSeparator=',' displayType="input" className="app-numeric-input" onValueChange={(values) => {
                                                                this.onRechargeDataStateChange(values.floatValue as number);
                                                            }}
                                                            // value={this.state.recharge}
                                                            />
                                                        </Form.Item>
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
                                                    height: "330px",
                                                    width: "100%",
                                                    marginTop: "10px",
                                                    marginBottom: "10px",
                                                    backgroundColor: "#d8ffd8",
                                                    borderRadius: "10px"
                                                }}
                                            >
                                                <div style={{ padding: "20px" }}>
                                                    <Divider orientation="left" className="app-divider-create-post">
                                                        Cú pháp nội dung chuyển khoản
                                                    </Divider>
                                                    <div style={{ margin: 24, border: '1px solid', borderRadius: 8, padding: '16px 24px 16px 16px', display: 'flex', flexDirection: 'column' }}>
                                                        {/* <span><strong>{this.state.rechargeCode} {'<Noi dung thanh toan>'}</strong></span> */}
                                                        {/* <span>Ví dụ: {this.state.rechargeCode} nap tien dang tin SDT {this.state.currentUser.phoneNumber}</span> */}
                                                        <span><strong>{'<Tên tài khoản>'} {'nap tien dang tin'}</strong></span>
                                                        <span>Ví dụ: {this.state.currentUser?.username} nap tien dang tin</span>
                                                        {/* <span>--------------------------------------------</span>
                                                        <span><em>{this.state.rechargeCode}</em>{' là mã chuyển khoản của riêng bạn. Bạn vui lòng nhập đúng mã ở đầu nội dung chuyển khoản để việc xác nhận giao dịch được nhanh chóng và chính xác.'}</span> */}
                                                        <span>--------------------------------------------</span>
                                                        <span>Chuyển tiền tới: </span>
                                                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
                                                            <span>- Số tài khoản: 100000686868</span>
                                                            <span>- Chủ tài khoản: Đặng Văn Kiên</span>
                                                            <span>- Ngân hàng: Vietcombank</span>
                                                        </div>
                                                        <span>--------------------------------------------</span>
                                                        <span><em>Tiền sẽ được cập nhật vào ví của bạn sau khi admin nhận được số tiền chuyển khoản.</em></span>
                                                        <span>Mọi thắc mắc xin liên hệ qua email: kienadmin@gmail.com</span>
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
                                {/* <div className="app-group-button">
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
                                        disabled={this.state.isDisableBtnNext}
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
                                </div> */}
                            </Col>
                        </Row>
                    </div>
                    <FooterTemplate></FooterTemplate>
                </div>
                : <></>
        )
    }

    private onRechargeDataStateChange(value: number): void {
        let isShowButton = false;
        if (!CommonUtility.isNullOrEmpty(value) && value > 0) {
            isShowButton = true;
        }
        this.setState({
            recharge: value,
            isDisableBtnNext: !isShowButton
        });
    }

    private getRechargeCode(): void {
        let code = 'BTS';
        let time = new Date().getTime().toString();
        code += time;
        this.setState({
            rechargeCode: code
        })
    }

    private sendRequest(): void {
        let dataPost = {
            money: this.state.recharge,
            userId: this.state.currentUser?.id,
            paymentType: 1,
            description: `recharge code: ${this.state.rechargeCode}`
        }
        this.coreService.sendRequestRecharge(dataPost).then((res: any) => {
            let noti_id = `recharge_${new Date().getTime()}`
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