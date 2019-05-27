export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

export const setSessionStorage = (key, value) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};