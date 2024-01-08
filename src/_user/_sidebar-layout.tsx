import React, { Suspense, useState } from 'react';
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { Breadcrumb, Layout, Menu, theme, Dropdown, Space, Divider, Button, Image, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import boilerLogo from "../../assets/images/logo-dashboard.png";
import { LuUnlock } from 'react-icons/lu';
import AuthenticationService from '../_services/_auth-service';
import { getNavItems } from './route/_nav';
import Loader from '../_global/_loader';

const { Header, Content, Footer, Sider } = Layout;
const authService = new AuthenticationService();
const logoutBtnClicked = () => {
    authService.logout();
}

const getSelectedMenuKeys = (): string[] | undefined => {
    const currLoc = useLocation().pathname;
    // console.log('URL: ', currLoc);
    if (sessionStorage.getItem('selectedKey')) {
        const menuItems = getNavItems();
        // console.log(menuItems);
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key == sessionStorage.getItem('selectedKey')) {
                if (menuItems[i].label.props.to == currLoc) {
                    return [menuItems[i].key];

                }
                // else {
                // }
            }
            if (menuItems[i].children) {
                for (let j = 0; j < menuItems[i].children.length; j++) {
                    if (menuItems[i].children[j].key == sessionStorage.getItem('selectedKey')) {
                        if (menuItems[i].children[j].label.props.to == currLoc) {
                            return [menuItems[i].children[j].key];
                        }
                        // else {
                        // }
                    }
                }
            }
        }
        // console.log(selectedMenuItem);
    }
    else {
        return undefined;
    }
}
const CustomLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token } = theme.useToken();

    const getChangePasswordUrl = () => {
        switch (authService.userData?.roleId) {
            case 1:
                return "/admin/change-password";
                break;
            case 5:
                return "/chief/change-password";
                break;
            case 6:
                return "/department/change-password";
                break;
            default:
                break;
        }
        return "";
    }
    // useEffect(() => {
    //     getCurrentUrlAndKey();
    // }, []);
    const userMenuItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a href="/">
                    My Profile
                </a>
            ),
        },
        getChangePasswordUrl() ? {
            key: '2',
            label: <NavLink to={getChangePasswordUrl()} className={'text-decoration-none'}>Change Password</NavLink>,
            icon: <LuUnlock />,
        } : null,
        {
            key: '3',
            label: (
                <a href="/">
                    2nd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
    ];

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
        boxShadow: 'none',
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header  >
                <Image
                    width={200}
                    preview={false}
                    src={boilerLogo}
                />
                <Dropdown className='ms-auto'
                    menu={{ items: userMenuItems }}
                    dropdownRender={(menu) => (
                        <div style={contentStyle}>
                            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                            <Divider style={{ margin: 0 }} />
                            <Space direction="vertical" style={{ padding: 8, width: '100%' }}>
                                <Button block type="primary" onClick={logoutBtnClicked} icon={<AiOutlineLogout />}>Logout</Button>
                            </Space>
                        </div>
                    )}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar icon={<AiOutlineUser />} />  {authService.getUserData?.userName}
                    </a>
                </Dropdown>
            </Header>
            <Layout>
                <Sider breakpoint="lg" collapsible collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)} width={200}
                >
                    {/* <div className="demo-logo-vertical" /> */}
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={getNavItems()} selectedKeys={getSelectedMenuKeys()} />
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200, transition: "0.2s ease" }}>
                    <Content style={{ margin: '0 8px' }}>
                        <Breadcrumb style={{ margin: '4px 0' }}>
                            {/* <Breadcrumb.Item>Department</Breadcrumb.Item>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div style={{ padding: 8 }}>
                            <Suspense fallback={<Loader />}>
                                <Outlet />
                            </Suspense>
                        </div>

                    </Content>
                    <Footer className='footer-user'>&copy; Designed, Developed & Hosted by OMAYA Group. Content Provided by Zenith Coworking Space, Raipur, Chhattisgarh.</Footer>
                </Layout>
            </Layout>
        </Layout >
    );
};

export default CustomLayout;