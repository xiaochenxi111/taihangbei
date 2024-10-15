import axios from '../utils/axios';


const insertAndUpdateProjectTraining=(operateData)=>{
    let standardData = {
        type:"sixth_term_experience",
        data:{type:'实训',...operateData}
    }
    return axios.put('/student/update',standardData)
}

const deleteProjectTraining=(operateData)=>{
    return axios.delete('/student/delete',{data:operateData})
}

const searchProjectTraining = (operateData) => {
    const params = new URLSearchParams(operateData);
    return axios.get(`/student/search?${params.toString()}`)
}

export { 
    insertAndUpdateProjectTraining, 
    deleteProjectTraining, 
    searchProjectTraining 
}
