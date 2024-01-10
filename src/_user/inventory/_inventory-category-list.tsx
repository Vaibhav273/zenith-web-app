import { Button, Table, Tag, Tooltip } from "antd";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import InventoryService from "../../_services/_inventory-service";
import { useEffect, useState } from "react";
import { ColumnType } from "antd/es/table";
import { FiEdit } from "react-icons/fi";
interface InventoryList {
    active: number;
    description: string;
    id: number;
    name: string;
}

const InventoryCategoryList = () => {
    const navigate = useNavigate();

    const inventoryService = new InventoryService();
    const [inventoryList, setInventoryList] = useState<InventoryList[]>();
    const [loadingInventoryList, setLoadingInventoryList] = useState(false);

    const columns: ColumnType<InventoryList>[] = [
        {
            title: '#',
            render: (text, record, index) => index + 1,
            width: '3%',
            align: "center"
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
            title: 'Active',
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
                            <Button icon={<FiEdit />} />
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
        getInventoryCategoryList();
    }, []);


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
                />
            </div>
        </>
    )
}

export default InventoryCategoryList;