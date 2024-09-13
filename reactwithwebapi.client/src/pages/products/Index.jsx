/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import axios from "axios";
import moment from "moment";

export default function Index({
    setViewProduct,
    setEditProduct,
    setDeleteProduct,
    openView,
    openEdit,
    openDelete,
    refresh
}) {
    const handleView = (product) => {
        setViewProduct(product);
        openView();
    };
    const EditProduct = (product) => {
        setEditProduct(product);
        
        openEdit();
    };
    const DeleteProduct = (product) => {
        setDeleteProduct(product);
        openDelete();
    };
    const [ProductsData, setProductsData] = useState([]);
    const Fetchdata = async () => {
        await axios.get('api/products').then((response) => {
            setProductsData(response.data.data)
        }).catch((error) => {
            console.error("Products Error : ", error);  
        })
        
    };
    useEffect(() => {
        Fetchdata();
    }, [refresh]);

   
    return (
        <div className="w-full px-5 text-white max-sm:px-1">
            <Table.ScrollContainer minWidth={800} type="native">
                <Table stickyHeader highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className="flex-3">Name</Table.Th>
                            <Table.Th className="flex-3">Type</Table.Th>
                            <Table.Th className="flex-3">Quantity</Table.Th>
                            <Table.Th className="flex-2">Created At</Table.Th>
                            <Table.Th className="flex-1">
                                {" "}
                                <div className="text-center">Action</div>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        { ProductsData.map((product) => (
                            <Table.Tr key={product.Id}>
                                <Table.Td className="max-w-[600px] truncate">{product.Name}</Table.Td>
                                <Table.Td className="max-w-[600px] truncate">{product.type}</Table.Td>
                                <Table.Td className="max-w-[600px] truncate">{product.quantity}</Table.Td>
                                <Table.Td>{moment(product.created_at).format("MMMM Do, YYYY")}</Table.Td>
                                <Table.Td>
                                    <div className="flex gap-x-3 w-full items-center justify-center">
                                        <button
                                            className="bg-blue-500 text-white px-3 hover:bg-blue-600"
                                            onClick={() => handleView(product)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="bg-yellow-500 text-white px-3 hover:bg-yellow-600"
                                            onClick={() => EditProduct(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 hover:bg-red-600"
                                            onClick={() => DeleteProduct(product)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </Table.Td>
                                </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </div>
    );
}
