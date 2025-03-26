export const storeData = async (
  key: string,
  value: Record<string, string>
): Promise<void> => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (err) {
    console.warn(err);
  }
};

export const getData = async (
  key: string
): Promise<Record<string, string> | undefined> => {
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

export const removeData = async (key: string): Promise<void> => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(err);
  }
};

export const containsKey = async (key: string): Promise<boolean> => {
  try {
    const keys = localStorage.getAllKeys();
    return keys.includes(key);
  } catch (err) {
    console.warn(err);
    return false;
  }
};
