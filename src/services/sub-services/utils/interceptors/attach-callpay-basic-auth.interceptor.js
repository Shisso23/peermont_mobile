import { encode64 } from 'node-forge/lib/util';

const createCallpayBasicAuthInterceptor = (axiosInstance, { username, password }) => {
  const _attachBasicAuth = (config) => {
    const token = encode64(`${username}:${password}`);
    config.headers.Authorization = `Basic ${token}`;
    return config;
  };

  return axiosInstance.interceptors.request.use(_attachBasicAuth);
};
export default createCallpayBasicAuthInterceptor;
