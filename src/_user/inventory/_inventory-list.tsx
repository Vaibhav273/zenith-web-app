import { Button, Form, Input, Modal, Select, Tag, Tooltip } from "antd";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import InventoryService from "../../_services/_inventory-service";
import { useEffect, useState } from "react";
import Table, { ColumnType } from "antd/es/table";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea";
interface InventoryList {
    inventoryId: number;
    inventoryName: string;
    categoryId: number;
    categoryName: string;
    description: string;
    activeStatus: number;
}

interface editData {
    inventoryId: number,
    inventoryName: string,
    categoryId: number,
    categoryName: string,
    description: string,
}

interface DDLList {
    id: number,
    value: string
}

const InventoryList = () => {
    const navigate = useNavigate();

    const inventoryService = new InventoryService();
    const [inventoryList, setInventoryList] = useState<InventoryList[]>();
    const [loadingInventoryList, setLoadingInventoryList] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);
    const [editData, setEditData] = useState<editData>();

    const [ddlList, SetDDLList] = useState<DDLList[]>([]);
    const [loadingDDLList, setLoadingDDLList] = useState(false);

    const columns: ColumnType<InventoryList>[] = [
        {
            title: '#',
            render: (text, record, index) => index + 1,
            width: '3%',
            key: '1'
        },
        {
            title: 'Name',
            dataIndex: 'inventoryName',
            key: '2'
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: '3'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: '4'
        },
        {
            title: 'Status',
            dataIndex: 'active',
            render: (value, record, index) => {
                return (
                    <>
                        {record.activeStatus == 1 ? <Tag color="success">Yes</Tag> : <Tag color="error">No</Tag>}
                    </>
                )
            },
            align: "center",
            key: '5'
        },
        {
            title: 'Action',
            align: "center",
            key: '6',
            render: (record) => {
                return (
                    <>
                        <Tooltip title="Edit">
                            <Button icon={<FiEdit />} onClick={() => showModal(record)} />
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    const getInventoryList = async () => {
        try {
            setLoadingInventoryList(true);
            let res = await inventoryService.getInventoryList();
            setInventoryList(() => {
                let _data: InventoryList[] = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    _data.push({
                        inventoryId: res.data.data[i].inventoryId,
                        inventoryName: res.data.data[i].inventoryName,
                        categoryId: res.data.data[i].categoryId,
                        categoryName: res.data.data[i].categoryName,
                        description: res.data.data[i].description,
                        activeStatus: res.data.data[i].activeStatus
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
        getInventoryList();
    }, []);

    const getInventoryDDLList = async () => {
        try {
            setLoadingDDLList(true);
            let res = await inventoryService.getDDLInventoryCategory();
            if (res.data.status) {
                SetDDLList(res.data.data);
            }
        } catch (error) {
            setLoadingDDLList(false);
        }
        finally {
            setLoadingDDLList(false);
        }
    }

    const showModal = (record: any) => {
        setIsModalOpen(true);

        getInventoryDDLList();

        setEditData(record);
        console.log(editData);


        form.setFieldsValue({
            name: editData?.inventoryName,
            inventoryCat: editData?.categoryId.toString(),
            description: editData?.description,
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const updateInventory = async () => {
        try {

            setLoadingFormSubmit(true);
            let DDLValue = ddlList.find(itm => itm.value == form.getFieldValue("categoryId"))
            const payload = {
                inventoryId: editData?.inventoryId,
                name: form.getFieldValue("name"),
                categoryId: form.getFieldValue("categoryId"),
                categoryName: DDLValue,
                description: form.getFieldValue("description"),
            }
            console.log(payload);

            const res = await inventoryService.updateInventoryCategory(payload);
            if (res.data.status) {
                Swal.fire({
                    html: 'Inventory Updated Successfully !',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                getInventoryList();
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
                <h5><span>Inventory</span> List</h5>
                <Button className="btn-primary" onClick={() => navigate('/user/new-inventory')}><FaPlus /> Add New</Button>
            </div>
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

                <Modal title="Update Inventory"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    keyboard={false}
                    maskClosable={false}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loadingFormSubmit} onClick={updateInventory}>
                            Submit
                        </Button>
                    ]}
                >
                    <Form
                        layout="vertical"
                        form={form}
                        name="inventoryCatForm"
                        onFinish={updateInventory}
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
                    </Form>
                </Modal >
            </div>
        </>
    )
}

export default InventoryList;