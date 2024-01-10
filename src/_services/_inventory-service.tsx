import axiosInstance from "../_global/_axiosInterceptor";

export class InventoryService {

    // Inventory Category

    createInventoryCategory = async (payload: any) => {
        return await axiosInstance.post('/inventory/create-inventory-category', payload);
    }

    getDDLInventoryCategory = async () => {
        return await axiosInstance.get('/inventory/get-ddl-inventory-categories');
    }

    getInventoryCategoryList = async () => {
        return await axiosInstance.get('/inventory/get-inventory-categories-list');
    }

    // Inventory 

    createInventory = async (payload: any) => {
        return await axiosInstance.post('/inventory/create-inventory', payload);
    }

    getInventoryList = async () => {
        return await axiosInstance.get('/inventory/get-inventory-list');
    }
}
export default InventoryService;