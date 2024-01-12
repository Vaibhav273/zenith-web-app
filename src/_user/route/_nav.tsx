import type { MenuProps } from 'antd';
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from "react-router-dom";
// import AuthenticationService from '../../_services/_auth-service';
import { MdOutlineInventory2 } from "react-icons/md";


export const getNavItems = (): any => {
    // const navigate = useNavigate();
    let navItems: MenuProps['items'] = [];
    // const authService = new AuthenticationService();

    const setKey = (key: string) => {
        sessionStorage.setItem('selectedKey', key);
    }
    // Admin Roles : [1,]
    navItems = [
        {
            key: '0',
            label: <NavLink to={'/user/dashboard'} className={'text-decoration-none'}>Dashboard</NavLink>,
            icon: <LuLayoutDashboard />,
            onClick: () => {
                setKey('0');
            }
        },
        {
            key: '1',
            label: <NavLink to={'/user/inventory-category'} className={'text-decoration-none'}>Inventory Category</NavLink>,
            icon: <MdOutlineInventory2 />,
            onClick: () => {
                setKey('1');
            }
        },
        {
            key: '2',
            label: <NavLink to={'/user/inventory'} className={'text-decoration-none'}>Inventory</NavLink>,
            icon: <MdOutlineInventory2 />,
            onClick: () => {
                setKey('2');
            }
        },
    ];


    return navItems;
}

