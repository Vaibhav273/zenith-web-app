import type { MenuProps } from 'antd';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import AuthenticationService from '../../_services/_auth-service';

export const getNavItems = (): any => {
    // const navigate = useNavigate();
    let navItems: MenuProps['items'] = [];
    const authService = new AuthenticationService();

    const setKey = (key: string) => {
        sessionStorage.setItem('selectedKey', key);
    }
    // Admin Roles : [1,]
    if (authService.getUserData?.roleId == 1) {
        navItems = [
            {
                key: '0',
                label: <NavLink to={'/'} className={'text-decoration-none'}>Home</NavLink>,
                icon: <IoHomeOutline />,
            },
            {
                key: '1',
                label: <NavLink to={'/admin/dashboard'} className={'text-decoration-none'}>Dashboard</NavLink>,
                icon: <LuLayoutDashboard />,
                onClick: () => {
                    setKey('1');
                }
            },
        ];
    }

    return navItems;
}
