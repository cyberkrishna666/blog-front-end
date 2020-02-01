import axios from 'axios'
import tokenService from '../services/token'
const baseUrl = '/blogs/'

const createPost = async newPost => {
  let token = tokenService.getToken()
  console.log('Post: ' + newPost)

  const config = {
    headers: { 'Authorization': token, 'Content-Type': `multipart/form-data` }
  }
  
  try {
    const response = await axios.post(baseUrl, newPost, config)
    console.log(response.data);
    
    return response.data
  } catch(exception) {
    console.log('Unauthorized user')
  }
}

const deletePost = async (postId) => {
  const token = tokenService.getToken()
  const postUrl = baseUrl + postId + '/'
  
  try {
    const response = await axios({
      method: 'delete',
      url: postUrl, 
      headers: {
        Authorization: token
      }
    })
    console.log(response.data);
    
    return response.data
  } catch(exception) {
    console.log('Unauthorized user')
  }
}

const getOnePost = async (postId) => {
  const postUrl = baseUrl + postId + '/'

  const response = await axios({
    method: 'get',
    url: postUrl
  })
    
    return response.data
}

const getMostLikedPosts = async () => {
  const url = `${baseUrl}mostliked/`
  const response = await axios.get(url)
  return response.data
}

const getMostCommentedPosts = async () => {
  const url = `${baseUrl}mostcommented/`
  const response = await axios.get(url)
  return response.data
}

const getRecentPosts = async () => {
  const url = `${baseUrl}recent/`
  const response = await axios.get(url)
  return response.data
}

const getAllPosts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updatePost = async (updatedPost, postId) => {
  const token = tokenService.getToken()
  const config = {
    headers: { Authorization: token }
  }
  const postUrl = baseUrl + postId + '/'

  try { 
    const response = await axios.put(postUrl, updatedPost, config)
    console.log(response.data)

    return response.data
  } catch(error) {
    console.log(error)
  }
}

export default { getAllPosts, createPost, deletePost, getOnePost, updatePost, getMostLikedPosts, getMostCommentedPosts, getRecentPosts }