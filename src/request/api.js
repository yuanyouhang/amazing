import { ElLoading, ElMessage } from 'element-plus'

const baseUrl = 'http://localhost:3003'
// const baseUrl = 'http://121.40.145.223:3003'

const objToQuery = (params) => {
  const queryString = Object.entries(params)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&')
  return queryString
}

const get = (path, params) => {
  const loadingInstance = ElLoading.service({ body: true, background: 'rgba(0,0,0,0)' })
  let url
  if(!params) {
    url = `${baseUrl}${path}`
  } else {
    url = `${baseUrl}${path}?${objToQuery(params)}`
  }
  return fetch(url).then(res => res.json())
  .then(res => {
    return res
  })
  .catch(err => {
    console.log('get 请求错误：', err);
    ElMessage.error('请求错误，请刷新重试')
    throw new Error(err)
  })
  .finally(() => {
    loadingInstance.close()
  })
}

const api = {
  getVideos(params) {
    return get('/videos', params)
  },
  getArticles(params) {
    return get('/articles', params)
  },
  getSites(params) {
    return get('/sites', params)
  },
  getPhysicists(params) {
    return get('/physicists', params)
  },
  getPhysicistsLimit(params) {
    return get('/physicists/limit', params)
  },
  getConcepts(params) {
    return get('/concepts', params)
  }
}



export default api