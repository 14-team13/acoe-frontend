import request from "./core";


export const login = (email: string, password: string) => {
  return request(
    {
      method: 'POST',
      url: '/login',
      data: {
        email: email,
        password: password
      }
    }
  )
}

export const loginsuccess = () => {
  return request({
    // method: 'GET',
    url: '/login/success'
  });
}

export const logout = () => {
  return request({
    method: 'POST',
    url: '/logout'
  });
}

