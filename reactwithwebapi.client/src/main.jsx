import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { setupAxiosInterceptors } from './axiosbootstrap.js'
import App from './App'
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import './index.css';
import { AuthProvider } from './AuthProvider.jsx';

const theme = createTheme({
    breakpoints: {
        xs: "30em",
        sm: "48em",
        md: "64em",
        lg: "74em",
        xl: "90em",
    },
});
createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme} defaultColorScheme="dark">
        <StrictMode>
            <AuthProvider>
                <div className="h-full w-full">
                    <App />
                </div>
            </AuthProvider>
        </StrictMode>,
    </MantineProvider>
)
