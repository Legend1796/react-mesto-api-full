// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'http://localhost:3000';

function getResponseData(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: "include",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => getResponseData(response))
};

export const autorise = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: "include",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => getResponseData(response))
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => getResponseData(response))
}