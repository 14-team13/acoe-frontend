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


//user 
export const getAdminUser = (_params : any) => {
  return request({
    method: 'GET',
    url: 'admin/user/users',
    params: _params // get
  });
}

export const putAdminUser = (_params : any, _userId: number) => {
  return request({
    method: 'PUT',
    url: 'admin/user/' + _userId,
    data: _params
  });
}


export const deleteAdminUser = (_userId: string) => {
  return request({
    method: 'DELETE',
    url: 'admin/user/' + _userId,
  });
}



//franchise
export const getAdminFranchisesList = () => {
  return request({
    method: 'GET',
    url: 'admin/franchise/franchises' 
    // data: {
    //   cafeId: _cafeId,
    // }
  });
}



export const getAdminFranchiseInfo = (_cafeId: number) => {
  return request({
    method: 'GET',
    url: 'admin/franchise/' + _cafeId, 
    // data: {
    //   _cafeId: _cafeId,
    // }
  });
}

export const postAdminFranchise = (_params : any) => {
  return request({
    method: 'POST',
    url: '/admin/franchise', 
    data: _params
  });
}

export const putAdminFranchise = (_params : any, _cafeId: number) => {
  return request({
    method: 'PUT',
    url: '/admin/franchise/' + _cafeId, 
    data: _params
  });
}

//cafelist
export const getAdminCafeList = (_params : any) => {
  return request({
    method: 'GET',
    url: '/admin/cafe/cafes',
    params: _params // get
  });
}

export const getAdminCafeInfo = (_cafeId: number) => {
  return request({
    method: 'GET',
    url: '/admin/cafe/' + _cafeId, 
  });
}

export const postAdminCafeInfo = (_params : any) => {
  return request({
    method: 'POST',
    url: '/admin/cafe/',
    data: _params //post
  });
}

export const putAdminCafeInfo = (_params : any, _cafeId: number) => {
  return request({
    method: 'PUT',
    url: '/admin/cafe/' + _cafeId,
    data: _params
  });
}

