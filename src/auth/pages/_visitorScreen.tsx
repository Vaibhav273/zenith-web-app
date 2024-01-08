import { Form, Input } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login-bg.png";
import androidImage from "../../assets/images/google-play.png";

const VisitorScreen = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const visitorSubmit = async () => {

    }

    return (
        <>
            <Container className="login-container">
                <Row>
                    <Col xl={12} className="login-box">
                        <Row>
                            <Col xl={6} className="form-section visitor-sction">
                                <Col xl={12} className="visitorBox">
                                    <h4>Get a free Day Pass</h4>
                                    <p>Book your visit from our app and experience Zenith for a day</p>
                                    <div className="small-divider"></div>
                                    <p>Download our app today</p>
                                    <img src={androidImage} alt="Android Icon" className="img-fluid" />
                                </Col>
                                <h4>Book your visit today</h4>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="boilerRegForm"
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
                                                <Input placeholder="7879....." />
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
                                </Form>
                            </Col>
                            <Col xl={6} className="text-center">
                                <img src={loginImage} alt="Login Icon" className="img-fluid" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default VisitorScreen;