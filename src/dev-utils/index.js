export const prettyPrint = (obj) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(obj, null, 2));
  }
};
