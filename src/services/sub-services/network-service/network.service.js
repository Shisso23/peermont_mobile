import ax from 'axios';
import { createNetworkErrorHandlerInterceptor } from '../utils/interceptors';

const axios = ax.create({
  timeout: 5000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  responseType: 'json',
});

createNetworkErrorHandlerInterceptor(axios);
export default axios;
