export const setValRecursive = (newObj: any, currObj: any) => {
  Object.keys(newObj).forEach((k: any) => {
    if (typeof newObj[k] == "object" && currObj[k] != null) {
      setValRecursive(newObj[k], currObj[k]);
    } else {
      currObj[k] = newObj[k];
    }
  });
  return currObj;
};
