/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal } from "@mantine/core";
import { motion } from "framer-motion"; // Import framer-motion library
import { Transition } from '@mantine/core';
function View({ opened, close, data }) {
    if (!data) return null;
    const duration = 500;
    return (
        <Modal
            opened={opened}
            onClose={close}
            title="View Product"
            centered
            transition='rotate-left'
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
                duration: duration / 2,
                transition: 'fade',
            }}
        >
            <form
                className="flex flex-col gap-y-3"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    value={data.Name}
                    className="p-2"
                    disabled
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    autoComplete="true"
                />
                <input
                    value={data.type}
                    className="p-2"
                    disabled
                    type="text"
                    placeholder="Product Type"
                    name="email"
                    autoComplete="true"
                />
                <div className="flex justify-center gap-x-2">
                    <button
                        className="p-2 px-5 rounded-md hover:bg-blue-500 hover:text-"
                        onClick={close}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default View;
