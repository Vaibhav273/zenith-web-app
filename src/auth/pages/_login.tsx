import { Col, Container, Row } from "react-bootstrap";
import { AuthenticationService } from "../../_services/_auth-service";
import { Button, Divider, Flex, Form, Input } from "antd";
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
                username: formData.emailId,
                password: formData.password,
            }
            console.log(payload);

            const res = await authService.login(payload);
            if (res.data.status) {
                sessionStorage.setItem('authToken', res.data.access_token);
                sessionStorage.setItem('refreshToken', res.data.refresh_token);
                sessionStorage.setItem('loginTimeStamp', new Date().getTime().toString());
                // Admin Roles : [1,]
                navigate('/user/dashboard');
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
            <Col xl={{ span: 10, offset: 1 }} lg={12} md={12} className="login-container">
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
                                        name="emailId"
                                        label="Email Id"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your Email Id',
                                            },
                                        ]}
                                    >
                                        <Input type="email" placeholder="Enter Email Id" />
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
                                        <Input.Password placeholder="Enter Password" />
                                    </Form.Item>

                                    <Link to={""} className="forgot-text">Forgot Password?</Link>

                                    <Flex vertical gap="small" style={{ width: '100%' }}>
                                        <Button className="custom-button" htmlType="submit">Sign in <FaArrowRight /></Button>
                                    </Flex>

                                    <Divider>Or</Divider>
                                    <p className="account-text">Don't you have an account?</p>
                                    <p className="account-text admin-text-color">Contact your admin to create your account</p>
                                </Form>
                            </Col>
                            <Col xl={6} className="text-center">
                                <img src={loginImage} alt="Login Icon" className="img-fluid" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default LoginScreen;