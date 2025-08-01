import { useState } from "react"
import { createContext } from "react"
import { toast } from "react-toastify"
import axios from "axios"

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):'')
    
    const [employees,setEmployees] = useState([])
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllEmployees = async()=>{
        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/all-employees',{},{headers:{aToken}})
            if(data.success){
                setEmployees(data.employees)
                console.log(data.employees)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (employeeId) =>{
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability',{employeeId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllEmployees()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken,setAToken,
        backendUrl,employees,
        getAllEmployees,changeAvailability,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>

    )
}

export default AdminContextProvider