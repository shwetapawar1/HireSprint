import { BrowserRouter,Routes, Navigate, Route } from 'react-router-dom';

import Login from './pages/Login'
import Register from './pages/Register';

import JobseekerDashboard from './pages/JobseekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Jobs from './pages/Jobs';
import PostJobs from './pages/PostJobs';

//Protected route
const ProtectedRoute = ({allowedRoles, children}) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") ||  "null");

  if(!token  || !user) {
    return <Navigate to="/login" replace />;
  }
   if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {


  return (
  <BrowserRouter>
  <Routes>

    <Route path='/' element={<Navigate to="/login" />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />

    <Route 
       path='/jobseeker-dashboard'
       element ={ 
        <ProtectedRoute allowedRoles={["jobseeker"]}>
          <JobseekerDashboard />
        </ProtectedRoute>
       }
    
    />
     <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        <Route 
        path="/jobs"
        element={
          <ProtectedRoute allowedRoles={["jobseeker"]}>
            <Jobs />
          </ProtectedRoute>
        }


/>

<Route
  path="/post-job"
  element={
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <PostJobs />
    </ProtectedRoute>
  }
/>

  </Routes>
  
  
  </BrowserRouter>
   )
  
}

export default App;
