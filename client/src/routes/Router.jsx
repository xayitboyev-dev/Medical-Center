import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Dashboard from '../pages/Dashboard'
import AuthContainer from '../containers/Auth/AuthContainer'
import Intro from '../pages/Intro/Intro'
import UserContainer from '../containers/UserContainer'
import Doctors from '../pages/Doctors/Doctors'
import About from '../pages/About/About'
import Services from '../pages/Services/Services'
import Hospitals from '../pages/Hospitals/Hospitals'
import GetOne from '../pages/Doctors/GetOne/GetOne'
import DoctorDashboard from '../pages/Doctor/Dashboard/Dashboard'
import Profile from '../pages/Profile/Profile'
import AdminContainer from '../containers/Admin/AdminContainer'
import AdminDashboard from '../pages/Admin/Dashboard/Dashboard';
import AdminHospitals from '../pages/Admin/Hospitals/Hospitals';
import AdminServices from '../pages/Admin/Services/Services';
import AdminDoctors from '../pages/Admin/Doctors/Doctors';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthContainer />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<UserContainer />}>
            <Route index element={<Intro />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="services" element={<Services />} />
            <Route path="doctors">
              <Route index element={<Doctors />} />
              <Route path=":id" element={<GetOne />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path='admin' element={<AdminContainer />}>
              <Route index element={<Navigate to={"/admin/dashboard"} />}></Route>
              <Route path='dashboard' element={<AdminDashboard />}></Route>
              <Route path='hospitals' element={<AdminHospitals />}></Route>
              <Route path='services' element={<AdminServices />}></Route>
              <Route path='doctors' element={<AdminDoctors />}></Route>
            </Route>
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path='doctor'>
              <Route index element={<DoctorDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router