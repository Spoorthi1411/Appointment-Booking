import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import AllAppointments from './pages/admin/AllAppointments';
import ServicesList from './pages/admin/ServicesList';
import Dashboard from './pages/admin/Dashboard';
import AddService from './pages/admin/AddService';
import { ServiceContext } from './context/ServiceContext';
import ServiceDashboard from './pages/Service/serviceDashboard';
import ServiceAppointments from './pages/service/ServiceAppointments';
import ServiceProfile from './pages/Service/serviceProfile';



const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(ServiceContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={
            aToken ? <Navigate to="/admin-dashboard" /> : dToken ? <Navigate to="/service-dashboard" /> : <Login />
          } />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-service' element={<AddService />} />
          <Route path='/service-list' element={<ServicesList />} />
          <Route path='/service-list/:category' element={<ServicesList />} />

          {/* service Route */}
          <Route path='/service-dashboard' element={<ServiceDashboard />} />
          <Route path='/service-appointments' element={<ServiceAppointments />} />
          <Route path='/service-profile' element={<ServiceProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App

