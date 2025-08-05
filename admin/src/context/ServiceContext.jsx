import { createContext,useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

export const ServiceContext = createContext()

const ServiceContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken'):'')
    const [appointments, setAppointments] =useState([])

    const getAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl+ '/api/employee/appointments',{headers:{dToken}})
            if(data.success){
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse());
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    const value = {
        dToken,setDToken,
        backendUrl,
        appointments,setAppointments,
        getAppointments,
    }

    return (
        <ServiceContext.Provider value={value}>
            {props.children}
        </ServiceContext.Provider>

    )
}

export default ServiceContextProvider