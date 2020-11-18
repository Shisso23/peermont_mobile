const constructAxiosCancelToken = ({ requestSource }) => {
  return {
    cancelToken: requestSource.token,
  };
};

export default {
  constructAxiosCancelToken,
};
