import axios from '../utils/axios';
// import axios from 'axios';

export const login = data => 
    axios.post('/auth/admin-login', data);
