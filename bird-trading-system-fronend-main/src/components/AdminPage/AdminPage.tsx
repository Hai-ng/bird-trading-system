import { Layout, Menu, Avatar, MenuProps, Dropdown, Divider } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { CommonUtility } from '../../utilities/utilities';
import { IUserInfo } from '../CommonComponents/AppInterfaces';
import { IAdminPageProps, IAdminPageState } from './IAdminPage';
import { AdminHome } from './LayoutTemplates/AdminHome';
import { TransactionManagement } from './LayoutTemplates/AdminTransaction';
import { PostManagement } from './LayoutTemplates/AdminPostManagement';
import { UserManagement } from './LayoutTemplates/AdminUserManagement';
import { UserOutlined, HomeOutlined, ReconciliationOutlined, TwitterOutlined, CreditCardOutlined, FileTextOutlined, DollarOutlined, EuroCircleOutlined, TransactionOutlined, LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Category } from './LayoutTemplates/AdminCategory';
import { PackManagement } from './LayoutTemplates/AdminPackManagement';

export class AdminPage extends React.Component<IAdminPageProps, IAdminPageState> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: IAdminPageProps) {
        super(props);
        this.state = {
            currentUser: null,
            isCollapsedSlider: false,
            menuKey: '1'
        }
    }

    componentDidMount(): void {
        //check current user login
        let user = localStorage.getItem('currentUser');
        if (CommonUtility.isNullOrUndefined(user)) {
            CommonUtility.redirectTo('/home');
            return;
        }
        let objUser: IUserInfo = JSON.parse(user as string);
        if (objUser.role !== 'admin') {
            CommonUtility.redirectTo('/home');
            return;
        }
        this.setState({
            currentUser: JSON.parse(user as string)
        })
    }

    //#region component render
    render(): React.ReactNode {
        let menuItems = this.getMenuUser()
        return (
            (this.state.currentUser && this.state.currentUser.role === 'admin') ?
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider width={250} collapsible collapsed={this.state.isCollapsedSlider} onCollapse={(value) => {
                        this.setState({
                            isCollapsedSlider: value
                        })
                    }}>
                        <div style={{ height: 32, background: 'transparent' }} />
                        <Menu inlineIndent={24} theme="dark" defaultSelectedKeys={[this.state.menuKey]} mode="inline" items={items} onSelect={(args) => {
                            this.onChangeMenuPage(args)
                        }} />
                    </Sider>
                    <Layout className="site-layout">
                        <Layout.Header style={{ padding: 0, background: '#002140' }} className="App-header-main" >
                            <div className="App-header-welcome">
                                Welcome {this.state.currentUser.firstName + ' ' + this.state.currentUser.lastName}
                            </div>
                            <div className="App-header-user-login" >
                                <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
                                    <Avatar
                                        style={{ cursor: 'pointer' }}
                                        className="App-header-avatar"
                                        src={this.state.currentUser?.avatar ? this.state.currentUser.avatar : require('../../assets/images/guest-avatar.png')}
                                        shape="circle"
                                        size={32}
                                    ></Avatar>
                                </Dropdown>
                            </div>
                        </Layout.Header>
                        <div style={{ height: 32, background: 'transparent' }} />
                        {
                            this.state.menuKey === '1' ?
                                <AdminHome
                                    currentUser={this.state.currentUser}
                                    openMessage={this.props.openMessage}
                                    destroyMessage={this.props.destroyMessage}
                                />
                                : <></>
                        }
                        {
                            this.state.menuKey === '2' ?
                                <TransactionManagement
                                    currentUser={this.state.currentUser}
                                    openMessage={this.props.openMessage}
                                    destroyMessage={this.props.destroyMessage}
                                />
                                : <></>
                        }
                        {
                            this.state.menuKey === '3' ? <PostManagement
                                currentUser={this.state.currentUser}
                                openMessage={this.props.openMessage}
                                destroyMessage={this.props.destroyMessage}
                            /> : <></>
                        }
                        {
                            this.state.menuKey === '4' ?
                                <UserManagement
                                    currentUser={this.state.currentUser}
                                    openMessage={this.props.openMessage}
                                    destroyMessage={this.props.destroyMessage}
                                /> : <></>
                        }
                        {
                            this.state.menuKey === '5' ?
                                <Category
                                    currentUser={this.state.currentUser}
                                    openMessage={this.props.openMessage}
                                    destroyMessage={this.props.destroyMessage}
                                /> : <></>
                        }
                        {
                            this.state.menuKey === '6' ?
                                <PackManagement
                                    currentUser={this.state.currentUser}
                                    openMessage={this.props.openMessage}
                                    destroyMessage={this.props.destroyMessage}
                                /> : <></>
                        }
                    </Layout>
                </Layout>
                : <></>
        )
    }

    private onChangeMenuPage(args: any): void {
        this.setState({
            menuKey: args.key
        })
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
                    }
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
                        CommonUtility.redirectTo('/home');
                    }}>
                        Chế độ user
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

const items = [
    {
        key: '1',
        icon: <HomeOutlined />,
        children: null,
        label: 'Dashboard'
    },
    {
        key: '2',
        icon: <TransactionOutlined />,
        children: null,
        label: 'Transaction Management'
    },
    {
        key: '3',
        icon: <ReconciliationOutlined />,
        children: null,
        label: 'Posting Management'
    },
    {
        key: '4',
        icon: <UserOutlined />,
        children: null,
        label: 'User Management'
    },
    {
        key: '5',
        icon: <TwitterOutlined />,
        children: null,
        label: 'Category'
    },
    {
        key: '6',
        icon: <CreditCardOutlined />,
        children: null,
        label: 'Package'
    },

];
