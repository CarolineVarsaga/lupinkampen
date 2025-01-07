export const saveToLocalStorage = (key: string, data: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
  }
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? (JSON.parse(storedData) as T) : null;
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return null;
  }
};
