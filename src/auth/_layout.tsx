import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../_global/_loader";
import { Container, Row } from "react-bootstrap";

const AuthLayout = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Suspense fallback={<Loader />} >
                        <Outlet />
                    </Suspense>
                </Row>
            </Container>
        </>
    );
}

export default AuthLayout;