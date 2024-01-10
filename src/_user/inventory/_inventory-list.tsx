import { Button, Tag } from "antd";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import InventoryService from "../../_services/_inventory-service";
import { useEffect, useState } from "react";
import Table, { ColumnType } from "antd/es/table";
import { FiEdit } from "react-icons/fi";
interface InventoryList {
    active: number;
    description: string;
    id: number;
    name: string;
}

const InventoryList = () => {
    const navigate = useNavigate();

    const inventoryService = new InventoryService();
    const [inventoryList, setInventoryList] = useState<InventoryList[]>();
    const [loadingInventoryList, setLoadingInventoryList] = useState(false);

    const columns: ColumnType<InventoryList>[] = [
        {
            title: '#',
            render: (text, record, index) => index + 1,
            width: '3%',
            key: '1'
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'active',
            render: (record) => {
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
            align: "center",
            render: (record) => {
                return (
                    <>
                        <Button type="primary" icon={<FiEdit />} onClick={() => navigate("/user/update-inventory" + record.id)} />
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
                        active: res.data.data[i].active,
                        description: res.data.data[i].description,
                        id: res.data.data[i].id,
                        name: res.data.data[i].name
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
                />
            </div>
        </>
    )
}

export default InventoryList;