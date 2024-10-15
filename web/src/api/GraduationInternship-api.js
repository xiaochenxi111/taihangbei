import axios from '../utils/axios';


const insertAndUpdateGraduationInternship=(operateData)=>{
    let standardData = {
        type:"development",
        data:{...operateData}
    }
    return axios.put('/student/update',standardData)
}

const deleteGraduationInternship=(operateData)=>{
    return axios.delete('/student/delete',{data:operateData})
}

const searchGraduationInternship = (operateData) => {
    const params = new URLSearchParams(operateData);
    return axios.get(`/student/search?${params.toString()}`)
}

export { 
    insertAndUpdateGraduationInternship,
    deleteGraduationInternship,
    searchGraduationInternship 
}
