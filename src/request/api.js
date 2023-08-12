const baseUrl = `https://fc-mp-407a51fd-0e55-433f-9884-1e47bc6290f3.next.bspapp.com` // uniCloud 云函数调用基础路径

const objToQuery = (params) => {
  if(!params) {
    return params
  }
  const queryString = Object.entries(params)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&')
  return queryString
}

const get = (path, params) => {
  const url = `${baseUrl}${path}?${objToQuery(params)}`
  return fetch(url).then(res => res.json())
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })
}

const api = {
  getVideos(params) {
    return get('/getVideos', params)
  },
  getArticles(params) {
    return get('/getArticles', params)
  },
  getSites(params) {
    return get('/getSites', params)
  },
}



export default api