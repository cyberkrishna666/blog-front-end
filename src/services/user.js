import axios from 'axios'
import tokenService from '../services/token'
const baseUrl = '/users/'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

const getUser = async username => {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  const response = await axios({
    method: 'get',
    url: baseUrl + username,
    cancelToken: source.token
  })
  
  return response.data
}

const uploadAvatar = async (avatar) => {
  const url = `${baseUrl}avatar/`
  let token = tokenService.getToken()

  const config = {
    headers: { 'Authorization': token, 'Content-Type': `multipart/form-data` },
    cancelToken: source.token
  }
  
  try {
    const response = await axios.post(url, avatar, config)
    console.log(response.data);
    
    return response.data
  } catch(exception) {
    console.log('Unauthorized user')
  }
}

const addBio = async (bio) => {
  const url = `${baseUrl}bio/`
  let token = tokenService.getToken()

  const config = {
    headers: { 'Authorization': token },
    cancelToken: source.token
  }

  try {
    const response = await axios.post(url, { bio: bio }, config)
    console.log(response.data);
    
    return response.data
  } catch(exception) {
    console.log('Unauthorized user')
  }
}

export const banUserService = () => {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  return {
    cancelRequest: () => {
      source.cancel('User request is cancelled')
    },
    banUser: async (userId) => {
      let token = tokenService.getToken()
      
      const response = await axios({
        method: 'post',
        url: baseUrl + userId + '/ban/',
        headers: { 'Authorization': token },
        cancelToken: source.token
      })

      return response.data
    }
  }
}

const cancelRequest = () => {
  source.cancel('User request is cancelled')
}

export default { getUser, uploadAvatar, addBio, cancelRequest }