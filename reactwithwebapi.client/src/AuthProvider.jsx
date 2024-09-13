/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => ({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        expiry: localStorage.getItem('expiryToken'),
    }));

    const login = (tokens) => {
        setAuthTokens(tokens);
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        var datenow = new Date();
        datenow.setMinutes(datenow.getMinutes() + 60);

        const expiredDate = datenow.getTime();
        localStorage.setItem('expiryToken', expiredDate.toString());
        //console.log('expirytoken:', expiredDate.toString())
    };

    const logout = () => {
        setAuthTokens(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiryToken');
    };

    return (
        <AuthContext.Provider value={{ authTokens, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
