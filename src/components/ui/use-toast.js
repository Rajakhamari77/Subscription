// src/components/ui/use-toast.js
import React from 'react';

const ToastContext = React.createContext();

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const toast = (message) => {
        // Your toast display logic here, e.g. using a library like react-toastify
        console.log(message); // Replace with your toast implementation
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
        </ToastContext.Provider>
    );
};
