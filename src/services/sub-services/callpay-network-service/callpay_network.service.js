import ax from 'axios';
import { createNetworkErrorHandlerInterceptor } from '../utils/interceptors';

const callpayNetworkService = ax.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  responseType: 'json',
});

createNetworkErrorHandlerInterceptor(callpayNetworkService);
export default callpayNetworkService;
