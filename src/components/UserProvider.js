import React, { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [customer, setCustomer] = useState([]);

    return (
        <UserContext.Provider value={{customer, setCustomer}}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the context
export const useUser = () => useContext(UserContext);
