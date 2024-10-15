import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import PrivateRoute from '../components/PrivateRoute';
import AuthProvider from '../context/AuthProvider';
const AppRouter = () => {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Navigate replace to="/home/student-info" />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home/*" element={<Home />} />
          </Route>
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;



