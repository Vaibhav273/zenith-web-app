import { Suspense, useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Image, } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import zenithLogo from "../assets/images/logo-dashboard.png";
import { LuUnlock } from 'react-icons/lu';
import AuthenticationService from '../_services/_auth-service';
import { getNavItems } from './route/_nav';
import Loader from '../_global/_loader';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const { Content, Footer, Sider } = Layout;
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
const DashboardLayout = () => {
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
        getChangePasswordUrl() ? {
            key: '2',
            label: <NavLink to={getChangePasswordUrl()} className={'text-decoration-none'}>Change Password</NavLink>,
            icon: <LuUnlock />,
        } : null,
    ];

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
        boxShadow: 'none',
    };

    const [collapsedState, setCollapsedState] = useState({
        collapsed: false,
    });

    const toggle = () => {
        setCollapsedState({
            collapsed: !collapsedState.collapsed,
        });
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Sider
                    trigger={null}
                    collapsed={collapsedState.collapsed}
                    collapsible
                    breakpoint="lg"
                >
                    <div className='img-box'>
                        <Image
                            preview={false}
                            src={zenithLogo}
                            className='img-fluid'
                        />
                        <div className='icon-trigger'
                            onClick={toggle}
                        >
                            {collapsedState.collapsed ? <GoSidebarCollapse /> : <GoSidebarExpand />}
                        </div>
                    </div>
                    {/* <div className="demo-logo-vertical" /> */}
                    <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" items={getNavItems()} selectedKeys={getSelectedMenuKeys()} />
                </Sider>
                <Layout className="site-layout" style={{ transition: "0.2s ease" }}>
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

export default DashboardLayout;