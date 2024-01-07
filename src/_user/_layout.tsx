import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../_global/_loader";

const UserLayout = () => {

    return (
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    )
}
export default UserLayout;