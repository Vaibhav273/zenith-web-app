import { Button, Flex, Form, Input } from "antd";
import InventoryService from "../../_services/_inventory-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { Col } from "react-bootstrap";
import Swal from "sweetalert2";

const InventoryCategoryEntry = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const inventoryService = new InventoryService();
    const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);

    const submitInventoryCategory = async (formData: any) => {
        try {
            setLoadingFormSubmit(true);
            const payload = {
                name: formData.name,
                description: formData.description,
            }

            const res = await inventoryService.createInventoryCategory(payload);
            if (res.data.status) {
                Swal.fire({
                    html: 'Inventory Category Added Successfully !',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/user/inventory-category');
            }
        } catch (error) {
            setLoadingFormSubmit(false);
        }
        finally {
            setLoadingFormSubmit(false);
        }
    }

    return (
        <>
            <div className="dashboard-page-title">
                <h5><span>Inventory Category</span> Entry</h5>
            </div >
            <div className="dashboard-page-content">
                <Col lg={{ span: 6, offset: 3 }}>
                    <Form
                        layout="vertical"
                        form={form}
                        name="inventoryCatForm"
                        onFinish={submitInventoryCategory}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Name',
                                },
                            ]}
                        >
                            <Input type="text" placeholder="Enter Name" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Description',
                                },
                            ]}
                        >
                            <TextArea rows={4} placeholder="Enter Description" />
                        </Form.Item>
                        <Button htmlType="submit">Submit</Button>
                    </Form>
                </Col>
            </div>
        </>
    )
}

export default InventoryCategoryEntry;