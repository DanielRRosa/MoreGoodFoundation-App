// Create Functions
// Define a function to save content to local storage as an array
export const saveToLocalStorage = <T,>(key: string, value: T): void => {
  try {
    // Retrieve existing data from local storage (if any)
    const existingDataStr = localStorage.getItem(key);
    const existingData: T[] = existingDataStr
      ? JSON.parse(existingDataStr)
      : [];

    // Append the new value to the existing data array
    const updatedData = [...existingData, value];

    // Store the updated data array in local storage under the specified key
    localStorage.setItem(key, JSON.stringify(updatedData));
  } catch (err) {
    console.error(`Error saving to local storage (${key}):`, err);
  }
};

// Define a function to save content to local storage as an array temporarily
export const saveTemporarilyToLocalStorage = <T,>(
  key: string,
  value: T
): void => {
  try {
    // Retrieve existing data from local storage (if any)
    const existingDataStr = localStorage.getItem(key);
    const existingData: T[] = existingDataStr
      ? JSON.parse(existingDataStr)
      : [];

    // Store the updated data array in local storage under the specified key
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving temporarily to local storage (${key}):`, err);
  }
};

// Read Functions
// Define a function to get and check if exists the sended key
export const getFromLocalStorage = (key: string) => {
  try {
    const gettedData = localStorage.getItem(key as string);
  } catch (err) {
    console.error(`Error getting from local storage (${key}):`, err);
  }
};

// Delete Functions
// Define a function to delete content to local storage
export const deleteFromLocalStorage = (key: string) => {
  try {
    const deletedData = localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error deleting from local storage (${key}):`, err);
  }
};
