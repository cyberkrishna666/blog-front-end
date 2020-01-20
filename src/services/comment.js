import axios from 'axios'
import tokenService from '../services/token'
const baseUrl = '/comments/'

const createComment = async (newComment, postId) => {
  let token = tokenService.getToken()
  const url = `${baseUrl}${postId}/add/`
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.post(url, newComment, config)
    console.log(response.data);
    
    return response.data
  } catch(exception) {
    console.log('Unauthorized user')
  }
}

const deleteComment = async ( postId, commentId) => {
  let token = tokenService.getToken()
  const url = `${baseUrl}${postId}/remove/${commentId}`


  try {
    const response = await axios({
      method: 'delete',
      url: url,
      headers: {
        Authorization: token
      }
    })
    console.log(response.data)
    return response.data
  } catch(error) {
    console.log(`Error occured while comment delete: ${error}`)
  }
}

export default { createComment, deleteComment }