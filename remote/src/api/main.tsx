import request from "./core";


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