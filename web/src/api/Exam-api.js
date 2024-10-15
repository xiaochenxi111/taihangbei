import axios from '../utils/axios';


const insertAndUpdateExam=(operateData)=>{
    let standardData = {
        type:"development",
        data:{...operateData}
    }
    return axios.put('/student/update',standardData)
}

const deleteExam=(operateData)=>{
    return axios.delete('/student/delete',{data:operateData})
}

const searchExam = (operateData) => {
    const params = new URLSearchParams(operateData);
    return axios.get(`/student/search?${params.toString()}`)
}

export { 
    insertAndUpdateExam,
    deleteExam, 
    searchExam
}
