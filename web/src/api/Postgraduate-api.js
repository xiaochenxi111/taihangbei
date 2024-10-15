import axios from '../utils/axios';


const insertAndUpdatePostgraduate=(operateData)=>{
    let standardData = {
        type:"development",
        data:{...operateData}
    }
    return axios.put('/student/update',standardData)
}

const deletePostgraduate=(operateData)=>{
    return axios.delete('/student/delete',{data:operateData})
}

const searchPostgraduate = (operateData) => {
    const params = new URLSearchParams(operateData);
    return axios.get(`/student/search?${params.toString()}`)
}

export { 
    insertAndUpdatePostgraduate,
    deletePostgraduate,
    searchPostgraduate 
}
