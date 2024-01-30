import { Button, Form, Input, InputNumber, Select } from "antd";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import loginImage from "../../assets/images/login-bg.png";
import androidImage from "../../assets/images/google-play.png";
import iosImage from "../../assets/images/app-store.png";
import tagImage from "../../assets/images/tag-image.png";
import { FaArrowRight } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import CommonService from "../../_services/_common-services";
import AuthenticationService from "../../_services/_auth-service";
import Swal from "sweetalert2";
// import { useState } from "react";

const { Option } = Select;

export interface CommonCountryList {
    id: string;
    value: string;
}

const VisitorScreen = () => {
    const [form] = Form.useForm();
    const [otpForm] = Form.useForm();

    // const navigate = useNavigate();
    const [otpSent, setOTPSent] = useState(false);

    const [loadingCountryCode, setLoadingCountryCode] = useState(false);
    const [countryCodeList, setCountryCodeList] = useState<CommonCountryList[]>([]);
    const [countryCode, setCountryCode] = useState(String);

    const [showMobileForm, setShowMobileForm] = useState(true);
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [showMUserDetailForm, setShowMUserDetailForm] = useState(false);

    const commonService = new CommonService();
    const authService = new AuthenticationService();

    const getCountryCode = async () => {
        try {
            setLoadingCountryCode(true);
            let res = await commonService.getCountryCode();
            setCountryCodeList(res.data.data);

        } catch (error) {
            setLoadingCountryCode(false);
        }
        finally {
            setLoadingCountryCode(false);
        }
    }

    useEffect(() => {
        getCountryCode();
    }, []);

    const handleCountryCodeChange = (value: { id: string; value: React.ReactNode }) => {
        // setCountryCode();
        console.log(value.id);
    };

    const selectBefore = (
        <Select defaultValue={{ id: '+91', value: 'India' }} optionFilterProp="children"
            options={countryCodeList} loading={loadingCountryCode}
            filterOption={(input, option) =>
                (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleCountryCodeChange}
            style={{ width: '150x' }}
        />
    );


    const otpSubmit = async () => {
        try {
            setLoadingCountryCode(true);
            let payload: {
                countryCode: string
                mobileNo: number
            } = {
                countryCode: "+91",
                mobileNo: otpForm.getFieldValue('mobileNo')
            }
            let res = await authService.sendOTPLogin(payload);
            let otpRes = res.data;

            console.log(otpRes);

            if (otpRes.status) {
                Swal.fire({
                    html: otpRes.data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    // timer: 2000
                });
                localStorage.setItem('messageID', otpRes.data.msgId);
                setShowMobileForm(false);
                setShowOTPForm(true);
                // setCountryCodeList(res.data);
            }


        } catch (error) {
            setLoadingCountryCode(false);
        }
        finally {
            setLoadingCountryCode(false);
        }
    }

    const OTPverify = async () => {
        try {
            setLoadingCountryCode(true);
            let payload: {
                msgId: any,
                msgOtp: number,
                userType: number
            } = {
                msgId: localStorage.getItem("messageID"),
                msgOtp: otpForm.getFieldValue('otpInput'),
                userType: 2   // Visitor
            }
            let res = await authService.sendOTPLogin(payload);
            console.log(res);

            setCountryCodeList(res.data);

        } catch (error) {
            setLoadingCountryCode(false);
        }
        finally {
            setLoadingCountryCode(false);
        }
    }

    const visitorSubmit = async () => {

    }

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
                                {showMobileForm &&
                                    <Form
                                        layout="vertical"
                                        form={otpForm}
                                        name="visitorOTPForm"
                                        onFinish={otpSubmit}
                                        scrollToFirstError
                                    >
                                        <Col xl={{ span: 8, offset: 2 }}>
                                            <Form.Item
                                                name="mobileNo"
                                                label="Enter Mobile No."
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
                                        <Col className="text-center mb-3">
                                            <Button className="custom-button" htmlType="submit">Send OTP <FaArrowRight /></Button>
                                        </Col>
                                    </Form>
                                }
                                {showOTPForm &&
                                    <Form
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
                                    </Form>
                                }
                                {showMUserDetailForm &&
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
                                }

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