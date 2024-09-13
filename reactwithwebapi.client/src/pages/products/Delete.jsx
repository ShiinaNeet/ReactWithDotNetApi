/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Modal } from "@mantine/core";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
function DeleteProduct({ opened, close, data, notifyIndex }) {
    const { toast } = useToast();
    const formRef = useRef(null);
    const handleDeleteSupplier = (e) => {
        e.preventDefault();

        //const formData = new FormData(formRef.current);
        const name = data.Name
        try {
            // Do axios delete here
            axios.delete('api/products/' + data.Id)
                .then(response => {
                if (response.data.status == 'Success') {
                    toast({
                        title: "Deleted Successfully!",
                        description: `The Product ${name} was successfully updated.`,
                        variant: "destructive",
                        duration: 2000,
                    });
                    console.log("Deleted Successfully!");
                    notifyIndex();
                }
                }).catch(error => { 
                    toast({
                        title: "An Error occurred!",
                        description: `Error: ${error}`,
                        variant: "error",
                        duration: 2000,
                    });
                    console.log("Error: ", error);
                })
          
            close();
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                centered
                size="auto"
                withCloseButton={false}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <h1 className="py-5 text-2xl">
                    Do you want to Delete{" "}
                    <span className="text-red-500">{data.name}</span> ?
                </h1>
                <form ref={formRef} className="flex flex-col gap-y-3">
                    <input
                        disabled
                        value={data.Name}
                        className="p-2"
                        type="text"
                        placeholder="Product Name"
                        name="name"
                    />
                    <input
                        disabled
                        value={data.type}
                        className="p-2"
                        type="text"
                        placeholder="Type"
                        name="type"
                    />
                    <div className="flex justify-center gap-x-2">
                        <button
                            className="px-5 bg-red-600  rounded-md border- hover:bg-red-500 text-white"
                            onClick={handleDeleteSupplier}
                        >
                            Delete
                        </button>
                        <button
                            className="p-2 px-5 rounded-md hover:bg-blue-500 hover:text-"
                            onClick={close}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default DeleteProduct;
