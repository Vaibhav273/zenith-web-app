import { Button, Form, Input, Modal, Table, Tag, Tooltip } from "antd";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import InventoryService from "../../_services/_inventory-service";
import { useEffect, useState } from "react";
import { ColumnType } from "antd/es/table";
import { FiEdit } from "react-icons/fi";
import TextArea from "antd/es/input/TextArea";
import Swal from "sweetalert2";
interface InventoryList {
    active: number;
    description: string;
    id: number;
    name: string;
    isSelected: boolean;
}


interface editData {
    description: string;
    id: number;
    name: string;
}

const InventoryCategoryList = () => {
    const navigate = useNavigate();

    const inventoryService = new InventoryService();
    const [inventoryList, setInventoryList] = useState<InventoryList[]>();
    const [loadingInventoryList, setLoadingInventoryList] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);
    const [editData, setEditData] = useState<editData>()

    const columns: ColumnType<InventoryList>[] = [
        {
            title: '#',
            render: (text, record, index) => index + 1,
            width: '3%',
            align: "center",
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'active',
            render: (value, record, index) => {
                return (
                    <>
                        {record.active == 1 ? <Tag color="success">Yes</Tag> : <Tag color="error">No</Tag>}
                    </>
                )
            },
            align: "center"
        },
        {
            title: 'Action',
            render: (value, record, index) => {
                return (
                    <>
                        <Tooltip title="Edit">
                            <Button icon={<FiEdit />} onClick={() => showModal(record)} />
                        </Tooltip>
                    </>
                )
            },
            align: "center"
        }
    ]

    const getInventoryCategoryList = async () => {
        try {
            setLoadingInventoryList(true);
            let res = await inventoryService.getInventoryCategoryList();
            setInventoryList(() => {
                let _data: InventoryList[] = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    _data.push({
                        active: res.data.data[i].active,
                        description: res.data.data[i].description,
                        id: res.data.data[i].id,
                        name: res.data.data[i].name,
                        isSelected: false
                    })
                }
                return _data;
            });
        } catch (error) {
            setLoadingInventoryList(false);
        } finally {
            setLoadingInventoryList(false);
        }
    }

    useEffect(() => {
        getInventoryCategoryList();
    }, []);

    const showModal = (record: any) => {
        setIsModalOpen(true);

        setEditData(record);
        console.log(editData);


        form.setFieldsValue({
            name: editData?.name,
            description: editData?.description
        })
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const updateInventoryCategory = async () => {
        try {

            setLoadingFormSubmit(true);
            const payload = {
                id: editData?.id,
                name: form.getFieldValue("name"),
                description: form.getFieldValue("description"),
            }
            console.log(payload);

            const res = await inventoryService.updateInventoryCategory(payload);
            if (res.data.status) {
                Swal.fire({
                    html: 'Inventory Category Added Successfully !',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                getInventoryCategoryList();
                setIsModalOpen(false);
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
                <h5><span>Inventory Category</span> List</h5>
                <Button className="btn-primary" onClick={() => navigate('/user/new-inventory-category')}><FaPlus /> Add New</Button>
            </div >
            <div className="dashboard-page-content">
                <Table
                    bordered
                    columns={columns}
                    rowKey="noticeId"
                    dataSource={inventoryList}
                    loading={loadingInventoryList}
                    size="small"
                    scroll={{ x: 500 }}
                />
            </div>
            <Modal title="Update Inventory Category"
                open={isModalOpen}
                onCancel={handleCancel}
                keyboard={false}
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loadingFormSubmit} onClick={updateInventoryCategory}>
                        Submit
                    </Button>
                ]}
            >
                <Form
                    layout="vertical"
                    form={form}
                    name="inventoryCatForm"
                    onFinish={updateInventoryCategory}
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
                </Form>
            </Modal >
        </>
    )
}

export default InventoryCategoryList;