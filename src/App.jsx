import { Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import LoginForm from './pages/LoginForm';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EventRegisterForm from './pages/EventRegisterForm';
import UserRoute from './components/UserRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Announcements from './components/Announcements';

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Events' element={<Events/>}/>
        <Route path='/Login' element={<LoginForm/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route 
          path='/Registration/:eventId' 
          element={
            <UserRoute>
              <EventRegisterForm/>
            </UserRoute>
          }
        />
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route 
          path='/admin' 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
       <Footer/>
    </AuthProvider>
  );
}

// Add this default export
export default App;