import axios from '../utils/axios';
const insertStudentInfo=(operateData)=>{
    let standardData = {
        type:"students",
        data:operateData
    }
    return axios.post('/student/insert',standardData)
}

const updateStudentInfo=(operateData)=>{
    let standardData = {
        type:"students",
        data:operateData
    }
    return axios.put('/student/update',standardData)
}

const deleteStudentInfo=(operateData)=>{
    let standardData = {
        type:"students",
        data:operateData
    }
    return axios.delete('/student/delete',standardData)
}

const searchStudentInfo = (operateData) => {
    const params = new URLSearchParams(operateData);
    return axios.get(`/student/search?${params.toString()}`)  
}

export { 
    insertStudentInfo, 
    updateStudentInfo, 
    deleteStudentInfo, 
    searchStudentInfo 
}
