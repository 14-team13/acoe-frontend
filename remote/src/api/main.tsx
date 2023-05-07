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

export const getFranchises = () => {
  return request({
    method: 'GET',
    url: '/main/franchise/franchises'
  });
}

export const getCafesList = () => {
  return request({
    method: 'GET',
    url: '/main/cafe/cafes/3120000'
  });
}


export const getCafeInfo = (cafeId: number) => {
  return request({
    method: 'GET',
    url: '/main/cafe/' + cafeId, // 수정필요
    // data: {
    //   cafeId: cafeId,
    // }
  });
}

export const getCafeKeyword = (cafeTitle: string) => {
  return request({
    method: 'GET',
    url: '/main/cafe/cafe-keyword/' + cafeTitle, // 수정필요
    // data: {
    //   cafeId: cafeId,
    // }
  });
}