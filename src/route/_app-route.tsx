import React from "react";
import { createBrowserRouter, redirect } from 'react-router-dom';
import Layout from "../_layout";
import Error from "../_global/_error";
import AuthLayout from "../auth/_layout";
import AuthenticationService from "../_services/_auth-service";
import ErrorScreen from "../_global/_error";
import UserLayout from "../_user/_layout";
import VisitorScreen from "../auth/pages/_visitorScreen";
import DashBoardScreen from "../_user/_dashboard";


// const Home = React.lazy(() => import('../pages/_home'));
const Login = React.lazy(() => import('../auth/pages/_login'));

const DashboardLayout = React.lazy(() => import("../_user/_sidebar-layout"));

const redirectIfUser = () => {
    const authService = new AuthenticationService();
    // const userData: UserModel = authService.getUserData;
    if (authService.getUserData) {
        const userData = authService.getUserData;
        console.log("userData: ", userData);
        if (userData.roleId == 1) {
            return redirect('/admin/dashboard');
        }
        else if (userData.roleId == 6) {
            return redirect('/department/dashboard');
        }
        else if (userData.roleId == 4) {
            return redirect('/industrialist/dashboard');
        }
        else if (userData.roleId == 5) {
            return redirect('/chief/dashboard');
        }
    }
    return null;
}

const redirectIfNotLoggedIn = () => {
    if (!sessionStorage.getItem("authToken")) {
        return redirect('/login');
    }
    return null;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Login /> },
        ]
    },
    //#region Auth Pages **********************************************************
    {
        element: <AuthLayout />, loader: redirectIfUser, errorElement: <ErrorScreen />,
        children: [
            { path: '/vistor-screen', element: <VisitorScreen /> },
            { path: '/login', element: <Login /> },
        ]
    },
    //#endregion Auth Pages **********************************************************
    //#region User Pages *************************************************************
    {
        element: <UserLayout />, errorElement: <ErrorScreen />, id: 'Dashboard', loader: redirectIfNotLoggedIn,
        children: [
            {
                path: 'user', element: <DashboardLayout />,
                children: [
                    { path: 'dashboard', element: <DashBoardScreen />, index: true },
                    // { path: 'boiler-list/new-application', element: <BoilerList applicationType="new-application" /> },
                ]
            }
        ]
    }
    //#region User Pages **************************************************************
]);

export default router;