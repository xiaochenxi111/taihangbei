import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const localUser = localStorage.getItem('user');
    const [user, setUser] = useState(localUser);

    const handleUserInfo = (userData) => {
        setUser(userData);
        navigate('/home');  
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        navigate('/login');  
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, handleUserInfo, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
