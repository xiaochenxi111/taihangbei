import axios from '../utils/axios';

export const changePassword = data => 
    axios.put('/admin/changePd', data);
