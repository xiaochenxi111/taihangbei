import axios from '../utils/axios';


const insertAndUpdateEmployment=(operateData)=>{
    let standardData = {
        type:"development",
        data:{...operateData}
    }
    return axios.put('/student/update',standardData)
}

const deleteEmployment=(operateData)=>{
    return axios.delete('/student/delete',{data:operateData})
}

const searchEmployment = (operateData) => {
    const params = new URLSearchParams(operateData);
    return axios.get(`/student/search?${params.toString()}`)
}

export { 
    insertAndUpdateEmployment,
    deleteEmployment,
    searchEmployment
}