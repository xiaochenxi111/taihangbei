import axios from '../utils/axios';

export const excelUpload = data => 
    axios.post('/excel/insert', data);