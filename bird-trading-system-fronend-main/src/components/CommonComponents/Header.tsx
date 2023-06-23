/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Button, Col, Divider, Dropdown, Layout, MenuProps, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { IUserInfo } from "./AppInterfaces";
import '../../assets/styles/styles-global.scss';
import { CommonUtility } from "../../utilities/utilities";
import { UserOutlined, FileTextOutlined, DollarOutlined, EuroCircleOutlined, TransactionOutlined, LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons';


interface IHeaderProps {
    activeTab: number;
}

interface IHeaderState {
    currentUser: IUserInfo | null;
}

export class HeaderTemplate extends React.Component<IHeaderProps, IHeaderState> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount(): void {
        this.getUserLogin();
    }

    render(): React.ReactNode {
        let menuItems = this.getMenuUser();
        return (
            <Layout>
                <Header className="App-header-main" style={{ backgroundColor: '#64be43' }}>
                    <div className="App-header-logo">
                        <img src={require('../../assets/images/LOGO2.png')} alt="logo" />
                    </div>
                    <div className="App-header-menu">
                        <Row>
                            <Col
                                style={{ backgroundColor: this.props.activeTab === 1 ? '#64aa43' : 'transparent' }}
                                span={3} className="header-tab tab-1">
                                <a href="/home"><div className={this.props.activeTab === 1 ? 'active-tab' : ''}>Trang Chủ</div></a>
                            </Col>
                            <Col
                                style={{ backgroundColor: this.props.activeTab === 2 ? '#64aa43' : 'transparent' }}
                                span={3} className="header-tab tab-2">
                                <a href="/bird"><div className={this.props.activeTab === 2 ? 'active-tab' : ''}>Chim Cảnh</div></a></Col>
                            <Col
                                style={{ backgroundColor: this.props.activeTab === 3 ? '#64aa43' : 'transparent' }}
                                span={3} className="header-tab tab-3">
                                <a href="/birdcage"><div className={this.props.activeTab === 3 ? 'active-tab' : ''}>Lồng Chim</div></a></Col>
                            <Col
                                style={{ backgroundColor: this.props.activeTab === 4 ? '#64aa43' : 'transparent' }}
                                span={3} className="header-tab tab-4">
                                <a href="/accessory"><div className={this.props.activeTab === 4 ? 'active-tab' : ''}>Phụ Kiện</div></a></Col>
                            {
                                this.state.currentUser ?
                                    <Col
                                        style={{ backgroundColor: this.props.activeTab === 5 ? '#64aa43' : 'transparent' }}
                                        span={3} className="header-tab tab-5">
                                        <a href="/posting"><div className={this.props.activeTab === 5 ? 'active-tab' : ''}>Đăng Bài</div></a></Col>
                                    : <></>
                            }
                            {
                                this.state.currentUser ?
                                    <Col
                                        style={{ backgroundColor: this.props.activeTab === 6 ? '#64aa43' : 'transparent' }}
                                        span={3} className="header-tab tab-6">
                                        <a href="/createBanner"><div className={this.props.activeTab === 6 ? 'active-tab' : ''}>Đăng Banner</div></a></Col>
                                    : <></>
                            }
                            {/* <Col
                                style={{ backgroundColor: this.props.activeTab === 7 ? '#64aa43' : 'transparent' }}
                                span={3} className="header-tab tab-7">
                                <a href="/News"><div className={this.props.activeTab === 7 ? 'active-tab' : ''}>Tin Tức</div></a></Col> */}
                        </Row>
                    </div>
                    <div className="App-header-user-login">
                        {

                            !CommonUtility.isNullOrUndefined(this.state.currentUser) ?
                                <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow trigger={['click']}>
                                    <Avatar
                                        className="App-header-avatar"
                                        src={this.state.currentUser?.avatar ? this.state.currentUser.avatar : require('../../assets/images/guest-avatar.png')}
                                        shape="circle"
                                        size={32}
                                    ></Avatar>
                                </Dropdown>
                                : <Button onClick={() => { this.onLogin() }}>Đăng nhập</Button>

                        }

                    </div>
                </Header>
            </Layout>

        )
    }

    private getUserLogin(): void {
        let user_login = localStorage.getItem('currentUser');
        if (user_login) {
            this.setState({
                currentUser: JSON.parse(user_login)
            })
            return;
        }
    }

    private onLogin(): void {
        CommonUtility.redirectTo('/login');
    }

    private getMenuUser(): MenuProps['items'] {
        let menuItems = [
            {
                key: 'groupTitle',
                type: 'group',
                label: (
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }} >
                            <Avatar
                                src={this.state.currentUser?.avatar ? this.state.currentUser.avatar : require('../../assets/images/guest-avatar.png')}
                                shape="circle"
                                size={28}
                            ></Avatar>
                        </div>
                        <div style={{ padding: 7 }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <span style={{ fontWeight: 500 }}>
                                {this.state.currentUser?.lastName} {this.state.currentUser?.firstName}
                            </span>
                            <span>
                                {this.state.currentUser?.username}
                            </span>
                        </div>
                    </div>
                ),
                children: [
                    {
                        key: 'userProfile',
                        label: (
                            <a href="/userpage">
                                Trang cá nhân
                            </a>
                        ),
                        icon: (
                            <UserOutlined />
                        )
                    },
                    {
                        key: 'recharge',
                        label: (
                            <a href="/recharge">
                                Nạp tiền vào ví
                            </a>
                        ),
                        icon: <DollarOutlined />
                    },
                    {
                        key: 'withdraw',
                        label: (
                            <a href="/withdraw">
                                Rút tiền
                            </a>
                        ),
                        icon: <EuroCircleOutlined />
                    },
                    {
                        key: 'postHistory',
                        label: (
                            <a href="/postHistory">
                                Lịch sử đăng bài
                            </a>
                        ),
                        icon: <FileTextOutlined />
                    },
                    {
                        key: 'transactionHistory',
                        label: (
                            <a href="/transactionHistory">
                                Lịch sử giao dịch
                            </a>
                        ),
                        icon: <TransactionOutlined />
                    },
                ]
            },
            {
                key: 'divider',
                type: 'group',
                label: (
                    <Divider style={{ margin: 0 }} />
                )
            },


        ];

        if (this.state.currentUser?.role === 'admin') {
            menuItems.push({
                key: 'adminswitch',
                label: (
                    <span onClick={() => {
                        CommonUtility.redirectTo('/admin');
                    }}>
                        Chế độ admin
                    </span>
                ),
                icon: <UserSwitchOutlined />
            } as any);
            menuItems.push({
                key: 'divider',
                type: 'group',
                label: (
                    <Divider style={{ margin: 0 }} />
                )
            } as any);

        }

        menuItems.push({
            key: 'logout',
            label: (
                <span onClick={() => {
                    localStorage.removeItem('currentUser');
                    this.setState({
                        currentUser: null
                    })
                    CommonUtility.redirectTo('/home');
                }}>
                    Đăng xuất
                </span>
            ),
            icon: <LogoutOutlined />
        } as any)

        return menuItems;
    }

}