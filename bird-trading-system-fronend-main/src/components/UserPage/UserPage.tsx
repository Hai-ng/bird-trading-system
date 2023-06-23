import { Avatar, Button, Col, Divider, Form, Input, message, Row, Tooltip } from 'antd';
import React from 'react';
import { CommonUtility } from '../../utilities/utilities';
import { FooterTemplate } from '../CommonComponents/Footer';
import { HeaderTemplate } from '../CommonComponents/Header';
import { IUserPageProps, IUserPageState } from './IUserPage';
import { Card, Space } from 'antd';
import { NumericFormat } from 'react-number-format';
import CoreServices from '../../services/data.services';
import { RetweetOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';

export class UserPage extends React.Component<IUserPageProps, IUserPageState> {
    public coreService = new CoreServices();
    constructor(props: IUserPageProps) {
        super(props);
        this.state = {
            currentUser: null,
            oldPassword: '',
            newPassword: '',
            isCollapsedSlider: false,
            menuKey: '1',
            confirmPassword: ''
        }
    }

    componentDidMount(): void {
        //check current user login
        let user = localStorage.getItem('currentUser');
        if (CommonUtility.isNullOrUndefined(user)) {
            CommonUtility.redirectTo('/home');
            return;
        }
        // let objUser: IUserInfo = JSON.parse(user as string);
        // if (objUser.role !== 'user') {
        //     CommonUtility.redirectTo('/home');
        //     return;
        // }
        this.setState({
            currentUser: JSON.parse(user as string)
        })
    }

    render(): React.ReactNode {
        return (
            (this.state.currentUser) ?
                <div>
                    <HeaderTemplate activeTab={0}></HeaderTemplate>
                    <div
                        className="App-body-contain"
                        style={{
                            marginTop: 30,
                            width: "60%",
                            minHeight: "740px",
                            marginLeft: "20%",
                            marginBottom: "3%",
                            borderRadius: 10,
                            backgroundColor: "#EEEEEE",
                        }}
                    >
                        <div className="gap-element" style={{ paddingTop: 30 }}></div>
                        <Divider orientation="left" className="app-divider-create-post">
                            Hồ sơ của tôi
                        </Divider>
                        <Form
                            labelCol={{ span: 6 }}
                            layout="horizontal"
                            style={{ width: "90%", marginLeft: "5%" }}
                        >
                            <Row>
                                <Col span={7}>
                                    <Avatar
                                        style={{ cursor: 'pointer', marginLeft: '10%', marginTop: '8%' }}
                                        src={this.state.currentUser?.avatar ? this.state.currentUser.avatar : require('../../assets/images/guest-avatar.png')}
                                        shape="circle"
                                        size={100}
                                    ></Avatar>
                                </Col>
                                <Col span={17}>
                                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                        <Card title="Thông tin tài khoản" size="small">
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={5}>
                                                    <span>User Id:</span>
                                                </Col>
                                                <Col span={19}>
                                                    <span>{this.state.currentUser.id}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={5}>
                                                    <span>Tên đăng nhập:</span>
                                                </Col>
                                                <Col span={19}>
                                                    <span>{this.state.currentUser.username}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={5}>
                                                    <span>Số dư tài khoản:</span>
                                                </Col>
                                                <Col span={19}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '97%' }}>
                                                        <NumericFormat
                                                            style={{ width: '90%' }}
                                                            thousandSeparator=','
                                                            value={this.state.currentUser.balance}
                                                            displayType='text'
                                                            suffix=" ₫" />
                                                        <Tooltip title="Cập nhật số dư">
                                                            <Button icon={<RetweetOutlined />} onClick={() => {
                                                                this.onRefreshBalance();
                                                            }}></Button>
                                                        </Tooltip>
                                                    </div>

                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card title="Thông tin cá nhân" size="small">
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={5}>
                                                    <span>Họ:</span>
                                                </Col>
                                                <Col span={19}>
                                                    <span>{this.state.currentUser.lastName}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={5}>
                                                    <span>Tên:</span>
                                                </Col>
                                                <Col span={19}>
                                                    <span>{this.state.currentUser.firstName}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={5}>
                                                    <span>Email:</span>
                                                </Col>
                                                <Col span={19}>
                                                    <span>{this.state.currentUser.email}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={5}>
                                                    <span> Số điện thoại:</span>
                                                </Col>
                                                <Col span={19}>
                                                    <span>{this.state.currentUser.phoneNumber}</span>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={5}>
                                                    <span> Địa chỉ:</span>
                                                </Col>
                                                <Col span={19}>
                                                    <span>{this.state.currentUser.address}</span>
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card title="Thay đổi mật khẩu" size="small">
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={7}>
                                                    <span> Mật khẩu cũ:</span>
                                                </Col>
                                                <Col span={17}>
                                                    <Input
                                                        type="password"
                                                        onChange={(value) => {
                                                            this.setState({
                                                                oldPassword: value.target.value
                                                            });
                                                        }}>
                                                    </Input>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={7}>
                                                    <span> Mật khẩu mới:</span>
                                                </Col>
                                                <Col span={17}>
                                                    <Input
                                                        type="password"
                                                        onChange={(value) => {
                                                            this.setState({
                                                                newPassword: value.target.value
                                                            });
                                                        }}>
                                                    </Input>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingLeft: 10, marginBottom: 10 }}>
                                                <Col span={7}>
                                                    <span> Xác nhận mật khẩu:</span> 
                                                </Col>
                                                <Col span={17}>
                                                    <Input
                                                        type="password"
                                                        onChange={(value) => {
                                                            this.setState({
                                                                confirmPassword: value.target.value
                                                            });
                                                        }}>
                                                    </Input>
                                                </Col>
                                            </Row>
                                            <Button type="primary" style={{ width: '30%', marginLeft: "70%" }}
                                                onClick={() => {
                                                    this.changePassword();
                                                }}
                                            >
                                                Thay đổi
                                            </Button>

                                        </Card>
                                    </Space>
                                </Col>
                            </Row>

                        </Form>
                    </div >

                    <FooterTemplate></FooterTemplate>
                </div > : <></>
        )
    }
    private changePassword(): void {
        let dataPost = {
            username: this.state.currentUser?.username,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        }
        this.coreService.changePassword(dataPost).then((res) => {
            if (res.status === true) {
                this.props.openMessage('success', 'Thay đổi mật khẩu thành công', 3, 'change_password');
                setTimeout(() => {
                    localStorage.removeItem('currentUser');
                    CommonUtility.redirectTo('/login');
                }, 3000);
                return;
            }
            else {
                this.props.openMessage('error', 'Thay đổi mật khẩu thất bại', 3, 'change_password');
            }

        }).catch((err) => {
            message.error(err.message);
        })
    }

    private onRefreshBalance(): void {
        this.coreService.getUserInfoById(this.state.currentUser?.id as string, this.state.currentUser?.token as string).then(res => {
            let noti_id = `recharge_${new Date().getTime()}`
            if (res.status) {
                let newBalance = res.data.data.data.balance;
                let state = cloneDeep(this.state.currentUser);
                (state as any).balance = newBalance;
                localStorage.setItem('currentUser', JSON.stringify(state));
                this.setState({
                    currentUser: state
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
            this.props.openMessage('error', 'Đã xảy ra lỗi khi lấy số dư. Vui lòng tải lại trang và thử lại.', 3);
            return;
        })
    }
}
