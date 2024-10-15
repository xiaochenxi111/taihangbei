import axios from '../utils/axios';


const insertAndUpdateSemesterInternship=(operateData)=>{
    let standardData = {
        type:"sixth_term_experience",
        data:{type:'实习',...operateData}
    }
    return axios.put('/student/update',standardData)
}

// const updateSemesterInternship=(operateData)=>{
//     let standardData = {
//         type:"sixth_term_experience",
//         data:{type:'实习',...operateData}
//     }
//     return service.put('/student/update',standardData)
// }

const deleteSemesterInternship=(operateData)=>{
    return axios.delete('/student/delete',{data:operateData})
}

const searchSemesterInternship = (operateData) => {
    const params = new URLSearchParams(operateData);
    return axios.get(`/student/search?${params.toString()}`)
}

export { 
    insertAndUpdateSemesterInternship, 
    deleteSemesterInternship, 
    searchSemesterInternship 
}
