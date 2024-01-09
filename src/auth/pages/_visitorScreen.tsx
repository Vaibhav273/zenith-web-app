import { Button, Form, Input, InputNumber, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import loginImage from "../../assets/images/login-bg.png";
import androidImage from "../../assets/images/google-play.png";
import iosImage from "../../assets/images/app-store.png";
import tagImage from "../../assets/images/tag-image.png";
import { FaArrowRight } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";
// import { useState } from "react";

const { Option } = Select;

const VisitorScreen = () => {
    const [form] = Form.useForm();
    // const navigate = useNavigate();
    // const [otpSent, setOTPSent] = useState(false);

    const visitorSubmit = async () => {

    }

    const otpSubmit = async () => {

    }

    const selectBefore = (
        <Select defaultValue="+91" style={{ width: 60 }}>
            <Option value="+91">+91</Option>
            <Option value="+1">+1</Option>
        </Select>
    );

    return (
        <>
            <Col xl={{ span: 10, offset: 1 }} lg={12} md={12} className="visitor-container">
                <Row>
                    <Col xl={12} className="visitor-box">
                        <Row>
                            <Col xl={6} className="form-section">
                                <Col xl={12} className="visitor-box-Mobile">
                                    <Row>
                                        <Col xl={9}>
                                            <h4>Get a free Day Pass</h4>
                                            <p>Book your visit from our app and experience Zenith for a day</p>
                                            <div className="small-divider"></div>
                                            <p>Download our app today</p>

                                            <Link to={""}>
                                                <img src={iosImage} alt="Android Icon" className="img-fluid" />
                                            </Link>
                                            <Link to={""}>
                                                <img src={androidImage} alt="Android Icon" className="img-fluid" />
                                            </Link>

                                        </Col>
                                        <Col xl={3}>
                                            <img src={tagImage} alt="Android Icon" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </Col>
                                <h4>Book your visit today <PiStarFourFill /></h4>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="visitorForm"
                                    onFinish={visitorSubmit}
                                    scrollToFirstError
                                >
                                    <Row>
                                        <Col xl={6}>
                                            <Form.Item
                                                name="fullName"
                                                label="Full Name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter your Name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="John Deo" />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Item
                                                name="mobileNo"
                                                label="Your Contact No."
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter your Contact No.',
                                                    },
                                                ]}
                                            >
                                                {/* <InputNumber addonAfter={selectAfter} defaultValue={100} /> */}
                                                <InputNumber addonBefore={selectBefore} placeholder="7879....." style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Item
                                                name="companyName"
                                                label="Company Name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter your Company Name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="ex.: Accenture, TCS etc." />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Item
                                                name="emailId"
                                                label="Your Official e-mail address"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter your e-mail Id',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Enter e-mail Id" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Col className="text-center">
                                        <Button className="custom-button" htmlType="submit">Next <FaArrowRight /></Button>
                                    </Col>
                                </Form>
                                {/* <Form
                                    layout="vertical"
                                    form={form}
                                    name="otpForm"
                                    onFinish={otpSubmit}
                                    scrollToFirstError
                                    className="otp-form-section"
                                >
                                    <Col className="text-center">
                                        <p>We’ve sent an SMS, please enter the  OTP</p>
                                    </Col>

                                    <Col className="text-center">
                                        <Button className="custom-button" htmlType="submit">Submit</Button>
                                    </Col>
                                </Form> */}
                            </Col>
                            <Col xl={6} className="text-center box-image">
                                <img src={loginImage} alt="Login Icon" className="img-fluid" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </>
    )
}

export default VisitorScreen;