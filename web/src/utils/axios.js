import axios from 'axios'
import { message } from 'antd'
import env from '../env.js'
// 创建axios实例
const service = axios.create({
    // baseURL: env.apiUrl,
    timeout: 10000
})
// request拦截器
service.interceptors.request.use(
    config => {
        const userinfo = localStorage.getItem('user');
        config.headers.Authorization = userinfo && JSON.parse(userinfo).token;
        return config;
    }, 
    error => {
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.dir(error)
        if (error.response?.status) {
            switch (error.response.status) {
                case 403:
                    message.error(error.response.data);
                    break
                case 429:
                    message.error('失败次数过多，请 5 分钟后重试', 5);
                    break;

                // 404请求不存在
                case 404:
                    message.error('网络请求不存在');
                    break;
                    // 其他错误，直接抛出错误提示
                default:
                    if(error.response.data){
                        message.error(error.response.data);
                    }else{
                        message.error('请求出错');

                    }
            }
            return Promise.reject(error.response);
        }else{
            message.error(error.message)
        }
    }
)

export default service;
