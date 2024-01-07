import { Col, Container, Row } from "react-bootstrap";
import { AuthenticationService } from "../../_services/_auth-service";
import { Button, Divider, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaArrowRight } from "react-icons/fa6";
import loginImage from "../../assets/images/login-bg.png";


const authService = new AuthenticationService();
const LoginScreen = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();


    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const loginSubmit = async (formData: any) => {
        // console.log("formData", formData);
        // return;
        try {
            setLoadingSubmit(true);
            const payload = {
                emailId: formData.emailId,
                password: formData.password,
            }
            console.log(payload);

            const res = await authService.login(payload);
            if (!res.data.isLoginSuccessful) {
                Swal.fire({
                    html: res.data.message,
                    icon: 'warning',
                });
                return;
            }
            sessionStorage.setItem('authToken', res.data.authToken);
            sessionStorage.setItem('refreshToken', res.data.refreshToken);
            sessionStorage.setItem('loginTimeStamp', new Date().getTime().toString());
            const userData = authService.getUserData;
            console.log(userData);
            if (userData?.roleId == 1) { // Admin Roles : [1,]
                navigate('/admin/dashboard');
            }
            else if (userData?.roleId == 5) { // Department Roles : [5]
                navigate('/chief/dashboard');
            } else if (userData?.roleId == 6) { // Department Roles : [6]
                navigate('/department/dashboard');
            }
        }
        catch (error) {
            setLoadingSubmit(false);
        }
        finally {
            setLoadingSubmit(false);
            // reset();
        }
    };

    return (
        <>
            <Container className="login-container">
                <Row>
                    <Col xl={12} className="login-box">
                        <Row>
                            <Col xl={6} className="form-section">
                                <h3>Welcome Back</h3>
                                <p>Today is a new day. It's your day. You shape it. Sign in and get started with your hustle.</p>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="boilerRegForm"
                                    onFinish={loginSubmit}
                                    scrollToFirstError
                                >
                                    <Form.Item
                                        name="mobileNo"
                                        label="Registered Mobile No."
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your Registered Mobile No.',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Enter Mobile No." className="rounded-pill" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your password',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="Enter Password" className="rounded-pill" />
                                    </Form.Item>

                                    <Link to={""} className="forgot-text">Forgot Password?</Link>

                                    <Button className="custom-button">Sign in <FaArrowRight /></Button>

                                    <Divider>Or</Divider>
                                    <p className="account-text">Don't you have an account?</p>
                                    <p className="account-text admin-text-color">Contact your admin to create your account</p>
                                </Form>
                            </Col>
                            <Col xl={6}>
                                <img src={loginImage} alt="Login Icon" className="img-fluid" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LoginScreen;