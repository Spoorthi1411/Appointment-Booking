import { createContext } from "react";
import { BusinessList } from "../assets/asserts";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const value = {
        BusinessList,
        services: BusinessList
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider