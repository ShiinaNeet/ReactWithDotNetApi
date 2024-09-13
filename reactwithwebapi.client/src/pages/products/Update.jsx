/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal  } from "@mantine/core";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

function Update({ opened, close, data, notifyIndex }) {
    const { toast } = useToast();
    // form fields data here
    const [formValues, setFormValues] = useState({
        Id: data.Id || "",
        name: data.Name || "",
        type: data.type || "",
        quantity: data.quantity|| 1,
    });

    useEffect(() => {

        
       
    },[]);
    //console.log(formValues);
    const inputFields = [
        {
            id: 1,
            name: "name",
            type: "text",
            title: "Name should be more than two (2) characters",
            label: "Product",
            autoComplete: "on",
            pattern: "^[A-Za-z\\s0-9]{3,}",
            required: true,
        },
        {
            id: 2,
            name: "type",
            type: "text",
            title: "Please enter a valid type",
            label: "Name",
            autoComplete: "on",
            pattern: "^[A-Za-z\\s0-9]{3,}",
            required: true,
        },
        {
            id: 3,
            name: "quantity",
            type: "number",
            min: 1,
            title: "Quantity should be atleast 1",
            label: "Quantity",
            autoComplete: "on",
            pattern: "^[1-9][0-9]*$",
            required: true,
        },
    ];

    const handleUpdateProduct = async () => {
        // do the fetch here
        try {
            axios.put("/api/products/" + formValues.Id, formValues)
                .then(() => {
                    toast({
                        title: "Update Successfully!",
                        description: `The Product ${formValues.Name} was successfully updated.`,
                        duration: 2000,
                        variant: "info",
                    });
                    notifyIndex();
                })
                .catch(() => {
                    toast({
                        title: "Error!",
                        description: "Failed to update the Product. Please try again.",
                        duration: 2000,
                        variant: "error",
                    });
                })
                .finally(() => {
                    close();
                });
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
        //console.log(formValues.product + formValues.type);
        //toast({
        //    title: "Update Successfully!",
        //    description: `The Product ${formValues.Name} was successfully updated.`,
        //    duration: 2000,
        //    variant: "info",
        //});
        close();
    };

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleValidationErrors = (e) => {
        e.preventDefault();
        handleUpdateProduct();
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Update a Product" centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            >
                <form
                    onSubmit={handleValidationErrors}
                    className="flex flex-col gap-y-3"
                >
                    {inputFields.map((input) => {
                        return (
                            <div className="flex flex-col" key={input.id}>
                                <label htmlFor={input.name}>{input.label}</label>
                                <input
                                    {...input}
                                    className="`p-2 border rounded-md"
                                    value={formValues[input.name]}
                                    onChange={handleChange}
                                />
                            </div>
                        );
                    })}
                    <div className="flex justify-center gap-x-2">
                        <button
                            type="submit"
                            className="px-5 bg-blue-600  rounded-md border- hover:bg-blue-500 text-white"
                        >
                            Update
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

export default Update;
