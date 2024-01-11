import { Suspense, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Image, Button, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import zenithLogo from "../assets/images/logo-dashboard.png";
import { LuUnlock } from 'react-icons/lu';
import AuthenticationService from '../_services/_auth-service';
import { getNavItems } from './route/_nav';
import Loader from '../_global/_loader';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { TbLogout2 } from "react-icons/tb";


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
    const mobileMenuItems = getNavItems();

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
            <Navbar expand="lg" className="bg-body-tertiary mobile-menu">
                <Container>
                    <Navbar.Brand href="#">
                        <Image
                            width={170}
                            preview={false}
                            src={zenithLogo}
                            className='img-fluid'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {mobileMenuItems.map((elm: any, id: number) => {
                                return (
                                    <Link key={id} className='nav-link' to={elm.label.props.to}>{elm.label.props.children}</Link>
                                )
                            })}
                            {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Layout>
                <Sider
                    className='desktop-menu'
                    trigger={null}
                    collapsed={collapsedState.collapsed}
                    collapsible
                    breakpoint="lg"
                >
                    <div className='menu-part'>
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
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        <Tooltip title="Logout">
                            <Button onClick={logoutBtnClicked} className="btn-logout" icon={<TbLogout2 />}></Button>
                        </Tooltip>
                    </div>
                </Sider>
                <Layout className="site-layout" style={{ transition: "0.2s ease" }}>
                    <Content style={{ margin: '0 8px' }}>
                        <Breadcrumb style={{ margin: '4px 0' }}>
                            {/* <Breadcrumb.Item>Department</Breadcrumb.Item>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                            <Suspense fallback={<Loader />}>
                                <Outlet />
                            </Suspense>
                        </div>

                    </Content>
                    <Footer className='text-center footer-user'>&copy; Designed, Developed & Hosted by <span>OMAYA Group</span>. Content Provided by <span>Zenith Coworking Space, Raipur, Chhattisgarh</span>.</Footer>
                </Layout>
            </Layout>
        </Layout >
    );
};

export default DashboardLayout;