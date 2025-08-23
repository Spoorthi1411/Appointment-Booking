import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import {BusinessList} from "../assets/asserts";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [employees, setEmployees] = useState([]);

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)

    const getEmployeesData = async()=>{
        try {
            const {data} =await axios.get(backendUrl + '/api/employee/list')
            if(data.success){
                setEmployees(data.employees)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        BusinessList,
        services: BusinessList,
        employees,
        token,setToken,
        backendUrl
    }

    useEffect(()=>{
        getEmployeesData()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;