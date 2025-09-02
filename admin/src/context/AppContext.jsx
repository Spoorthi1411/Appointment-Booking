import { createContext } from "react"

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currency= '$'

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const slotDateFormat =(slotDate, slotTime)=>{
        if (!slotDate) return "";
        const dateArray = slotDate.split('_')
        const formattedDate = `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
        return slotTime ? `${formattedDate}, ${slotTime}` : formattedDate;
    }
    const value = {
        slotDateFormat,
        currency,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider