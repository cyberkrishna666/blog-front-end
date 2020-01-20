import axios from 'axios'
import tokenService from '../services/token'
const baseUrl = '/blogs/'

const createLike = async postId => {
  try {
    let token = tokenService.getToken()
    const postUrl = `${baseUrl + postId}/like/`
  
    const response = await axios({
      method: 'put',
      url: postUrl, 
      headers: {
        Authorization: token
      }
    })
  
    console.log(response.status)
    return response.data
  } catch (error) {
    console.log(error.name)
  }
}

const removeLike = async postId => {
  let token = tokenService.getToken()
  const postUrl = `${baseUrl + postId}/like/`

  const response = await axios({
    method: 'delete',
    url: postUrl, 
    headers: {
      Authorization: token
    }
  })

  console.log(response.status)
  return response.data
}

export default { createLike, removeLike }