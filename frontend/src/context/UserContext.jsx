import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const updateUser = (userData) => {
        setUser(userData)
    }

    const clearUser = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider
            value={{
                user, updateUser, clearUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider


UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
