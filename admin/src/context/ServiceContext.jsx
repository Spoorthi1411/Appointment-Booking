import { createContext,useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'
import { assets } from "../assets/assets"

export const ServiceContext = createContext()

const ServiceContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken'):'')
    const [appointments, setAppointments] =useState([])
    const [dashData, setDashData]=useState(false)
    const [profileData, setProfileData]= useState(false)

    const getAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl+ '/api/employee/appointments',{headers:{dToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const completeAppointment= async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/employee/complete-appointment', {appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const cancelAppointment= async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/employee/cancel-appointment', {appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getDashData = async ()=>{
        try {
            
            const {data} = await axios.get(backendUrl+ '/api/employee/dashboard', {headers:{'dToken':dToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
            }else{
                toast.error(data.message)
            }




        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const {data} =await axios.get(backendUrl+ '/api/employee/profile',{headers:{'dToken':dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData)
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
        getAppointments,cancelAppointment,
        completeAppointment,
        dashData,setDashData,getDashData,
        setProfileData, profileData, getProfileData,
    }

    return (
        <ServiceContext.Provider value={value}>
            {props.children}
        </ServiceContext.Provider>

    )
}

export default ServiceContextProvider