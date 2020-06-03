import { TOKEN_NAME } from 'config';
import router from '../router';
// import axios from "axios";
// import { Loading } from 'element-ui';

const { Loading } = ELEMENT;

let loading = null;

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30 * 1000
})

service.interceptors.request.use(
  config => {
    const opts = {
      background: 'rgba(0, 0, 0, .6)',
      text: '加载中……'
    };

    loading = Loading.service(opts);

    const token = localStorage.getItem(TOKEN_NAME);

    token && (config.headers.Authorization = token);

    return config;
  },
  err => {
    loading.close();
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  response => {
    loading.close();

    return response;
  },
  err => {
    const { status } = err.response;

    if (status === 401) {
      localStorage.removeItem(TOKEN_NAME);
      router.push('/login');
    }

    loading.close();
    return Promise.reject(err)
  }
)

export default service;
