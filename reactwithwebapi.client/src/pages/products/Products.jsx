import { useState } from "react";
import Index from "./Index";
import View from "./View";
import Add from "./Add";
import Delete from "./Delete";
import Update from "./Update";

import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";

export default function Products() {
    const [opened, { open, close }] = useDisclosure(false);
    const [refresh, setRefresh] = useState(false);
    //const [ProductData, setProductData] = useState([]);
    const [ViewProduct, setViewProduct] = useState([]);
    const [EditProduct, setEditProduct] = useState([]);
    const [DeleteProduct, setDeleteProduct] = useState([]);
    
    const [viewOpened, setViewOpened] = useState(false);
    const [viewEdit, setEditOpened] = useState(false);
    const [viewDelete, setDeleteOpened] = useState(false);

    const openView = () => setViewOpened(true);
    const closeView = () => setViewOpened(false);
    const openEdit = () => setEditOpened(true);
    const closeEdit = () => setEditOpened(false);
    const openDelete = () => setDeleteOpened(true);
    const closeDelete = () => setDeleteOpened(false);

    const triggerIndexUpdate = () => {
        setRefresh((prev) => !prev); // This will change `refresh`, triggering the IndexComponent to refresh
    };
    return (
        <div className="gap-y-5 text-white">
            <div className="grid justify-items-end py-5 px-2">
                <Button className="bg-slate-600 px-2 py-2 rounded-md text-white" onClick={open}>Create Product</Button>
            </div>

            <div className="w-full h-full">
                <Index
                    setViewProduct={setViewProduct}
                    setEditProduct={setEditProduct}
                    setDeleteProduct={setDeleteProduct}
                    openView={openView}
                    openEdit={openEdit}
                    openDelete={openDelete}
                    refresh={refresh}
                />
            </div>
            {opened ? <Add opened={opened} close={close} notifyIndex={triggerIndexUpdate} /> : ""}
            {viewOpened && (
                <View opened={viewOpened} close={closeView} data={ViewProduct} />
            )}
            {viewDelete && (<Delete opened={viewDelete} close={closeDelete} data={DeleteProduct} notifyIndex={triggerIndexUpdate} />)}
            {viewEdit && (
                <Update opened={viewEdit} close={closeEdit} data={EditProduct} notifyIndex={triggerIndexUpdate} />
            )}
        </div>
    );
}
