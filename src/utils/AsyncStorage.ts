export const storeData = (key: string, value: Record<string, string>) => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (err) {
    console.warn(err);
  }
};

export const getData = (key: string): Record<string, string> | undefined => {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
    return undefined;
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

export const removeData = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(err);
  }
};

export const containsKey = (key: string) => {
  try {
    const keys = localStorage.getAllKeys();
    return keys.includes(key);
  } catch (err) {
    console.warn(err);
    return false;
  }
};
