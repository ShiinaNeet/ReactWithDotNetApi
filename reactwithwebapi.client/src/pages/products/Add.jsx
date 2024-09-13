/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal } from "@mantine/core";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
function Add({ opened, close, notifyIndex }) {
    const { toast } = useToast();

    const handleAddProduct = async (values) => {

        axios.post("http://localhost:5127/api/products", values).then(response => {
            if (response.data.status == 'Success') {
                toast({
                    title: "Created Successfully!",
                    description: `The Product ${values.Name} was successfully created.`,
                    duration: 2000,
                    variant: "success",
                });
                notifyIndex();
            }
            else { 
                toast({
                    title: "Uh Oh! An Error Occured!",
                    description: `There is an error! Please try again`,
                    duration: 2000,
                    variant: "destructive",
                });
            }
        }).catch(error => {
            console.error("Error: ", error)
            toast({
                title: "Uh Oh! An Error Occured!",
                description: `${error}`,
                duration: 2000,
                variant: "destructive",
            });
        })
        
        console.log('Submit: ', values)
        close();
        //try {
        //    await fetch(collection(db, "Suppliers"), {
        //        name: values.username,
        //        email: values.email,
        //        created_at: new Date(),
        //    })
        //        .then(() => {
        //            toast({
        //                title: "Created Successfully!",
        //                description: `The Supplier ${values.username} was successfully created.`,
        //                duration: 2000,
        //                variant: "success",
        //            });
        //        })
        //        .catch((err) => {
        //            toast({
        //                title: "Product Creation Failed!",
        //                description: `An error occurred while creating the product. Please try again later.`,
        //                duration: 2000,
        //                variant: "error",
        //            });
        //            console.error(err);
        //        })
        //        .finally(() => {
        //            close();
        //        });
        //} catch (error) {
        //    console.log(error);
        //    console.log(error.message);
        //}
    };

    const inputFields = [
        {
            id: 1,
            name: "Name",
            type: "text",
            placeholder: "Name",
            title: "Name should be more than two (2) characters",
            label: "Product Name",
            autoComplete: "on",
            pattern: "^[A-Za-z\\s0-9]{3,}",
            required: true,
        },
        {
            id: 2,
            name: "type",
            type: "text",
            placeholder: "Product Type",
            title: "Name should be more than two (2) characters",
            label: "Type",
            autoComplete: "on",
            pattern: "^[A-Za-z\\s0-9]{3,}",
            required: true,
        },
        {
            id: 2,
            name: "quantity",
            type: "number",
            min: 1,
            placeholder: "Quantity",
            title: "Quantity should be atleast 1",
            label: "Quantity",
            autoComplete: "on",
            pattern: "^[1-9][0-9]*$",
            required: true,
        },
    ];

    const [values, setValues] = useState({
        Name: "",
        type: "",
        quantity: 1,
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Name:', name + ' ' + 'Value:', value)
        //console.log( values.product + values.type)
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleValidationError = (e) => {
        e.preventDefault();
        const inputErrors = {};

        inputFields.forEach((input) => {
            if (input.required && !values[input.name]) {
                inputErrors[input.name] = input.errormessage;
            } else if (
                input.pattern &&
                !new RegExp(input.pattern).test(values[input.name])
            ) {
                inputErrors[input.name] = input.errormessage;
            }
        });
        console.log(inputErrors);
        if (Object.keys(inputErrors).length === 0) {
            handleAddProduct(values);
        } else {
            setErrors(inputErrors);
            // handleAddSupplier(values);
        }
    };
    return (
        <>
            <Modal opened={opened} onClose={close} title="Add Product" centered
            overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
            }}>
                <form onSubmit={handleValidationError} className="flex flex-col">
                    {inputFields.map((input) => (
                        <div key={input.id} className="flex flex-col mb-4">
                            <label htmlFor={input.name} className="mb-1">{input.label}</label>
                            <input
                                {...input}
                                className={`p-2 border rounded-md ${errors[input.name] ? 'border-red-500' : 'border-gray-300'}`}
                                value={values[input.name]}
                                onChange={handleChange}
                            />
                            <span className={`text-red-500 mt-1 ${errors[input.name] ? 'block' : 'hidden'}`}>
                                {errors[input.name]}
                            </span>
                        </div>
                    ))}
                    <div className="flex justify-center gap-x-2 mt-4">
                        <button type="submit" className="px-5 py-2 bg-blue-600 rounded-md hover:bg-blue-500 text-white">
                            Create
                        </button>
                        <button
                            type="button"
                            className="px-5 py-2 rounded-md hover:bg-blue-500 hover:text-white"
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
export default Add;
