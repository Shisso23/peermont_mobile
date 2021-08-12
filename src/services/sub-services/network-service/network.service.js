import ax from 'axios';
import { createNetworkErrorHandlerInterceptor } from '../utils/interceptors';

const axios = ax.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

createNetworkErrorHandlerInterceptor(axios);
export default axios;
