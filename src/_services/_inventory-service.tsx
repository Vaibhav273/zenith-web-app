import axiosInstance from "../_global/_axiosInterceptor";

export class InventoryService {

    // Inventory Category

    createInventoryCategory = async (payload: any) => {
        return await axiosInstance.post('/inventory/create-inventory-category', payload);
    }

    getDDLInventoryCategory = async () => {
        return await axiosInstance.get('/inventory/get-ddl-inventory-categories');
    }

    getDDLInventoryCategoryList = async () => {
        return await axiosInstance.get('/inventory/get-inventory-categories-list');
    }

    // Inventory 

    createInventory = async (payload: any) => {
        return await axiosInstance.post('/inventory/create-inventory', payload);
    }
}
export default InventoryService;