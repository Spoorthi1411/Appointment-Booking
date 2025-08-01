import { createContext, useEffect, useState } from "react";
import { BusinessList } from "../assets/asserts";
import axios from 'axios'
import { toast } from 'react-toastify';


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [employees, setEmployees] = useState([]);
    const [services, setServices] = useState([]);

    const getEmployeesData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/employee/list');
            if (data.success) {
                setEmployees(data.employees);

                console.log("Employees from API:", data.employees);
                console.log("BusinessList:", BusinessList);

                // ✅ Normalize and filter
                const activeServices = BusinessList.filter(service => {
                    const hasEmployee = data.employees.some(emp => {
                        const match = emp.serviceName?.trim().toLowerCase() === service.serviceName.trim().toLowerCase();
                        if (match && emp.available) return true;
                        return false;
                    });
                    if (!hasEmployee) {
                        console.warn(`No available employee for service: ${service.serviceName}`);
                    }
                    return hasEmployee;
                });

                console.log("Active Services:", activeServices);
                setServices(activeServices);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };


    useEffect(() => {
        getEmployeesData();
    }, []);

    const value = {
        BusinessList,
        services: BusinessList,
        employees, // Full data for admin
        services   // Filtered list for customer UI
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
   /* const value = {
        BusinessList,
        services: BusinessList
    }

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

    useEffect(()=>{
        getEmployeesData()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider*/