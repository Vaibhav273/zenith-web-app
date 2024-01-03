import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import Layout from "../_layout";
import Error from "../global/_error";


const Home = React.lazy(() => import('../pages/_home'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
        ]
    }
]);

export default router;