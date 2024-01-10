import { Button, Form, Input, Select } from "antd";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InventoryService from "../../_services/_inventory-service";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Swal from "sweetalert2";

interface DDLList {
    id: number,
    value: string
}

const InventoryEntry = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const inventoryService = new InventoryService();
    const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);
    const [ddlList, SetDDLList] = useState<DDLList[]>([]);
    const [loadingDDLList, setLoadingDDLList] = useState(false);

    const getInventoryDDLList = async () => {
        try {
            setLoadingDDLList(true);
            let res = await inventoryService.getDDLInventoryCategory();
            if (res.data.status) {
                SetDDLList(res.data.data);
            }
            console.log(res);
        } catch (error) {
            setLoadingDDLList(false);
        }
        finally {
            setLoadingDDLList(false);
        }
    }

    useEffect(() => {
        getInventoryDDLList();
    }, []);

    const submitInventory = async (formData: any) => {
        try {
            setLoadingFormSubmit(true);
            const payload = {
                name: formData.name,
                categoryId: formData.inventoryCat,
                categoryName: formData.inventoryCatName,
                description: formData.description,
            }

            const res = await inventoryService.createInventory(payload);
            if (res.data.status) {
                Swal.fire({
                    html: 'Inventory Added Successfully !',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/user/inventory');
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
                <h5><span>Inventory</span> Entry</h5>
            </div >
            <div className="dashboard-page-content">
                <Col lg={{ span: 6, offset: 3 }}>
                    <Form
                        layout="vertical"
                        form={form}
                        name="inventoryCatForm"
                        onFinish={submitInventory}
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
                        <Form.Item name="inventoryCat" label="Category" rules={[
                            { required: true, message: 'Category Required' },
                        ]}>
                            <Select showSearch placeholder="Select Inventory Category" optionFilterProp="children"
                                // onChange={onChange} // onSearch={onSearch}
                                options={ddlList} loading={loadingDDLList}
                                filterOption={(input, option) =>
                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            />
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

export default InventoryEntry;