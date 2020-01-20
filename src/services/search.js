import axios from 'axios'
const baseUrl = '/search'

const getPostsBySearch = async (searchQuery) => {
  try {
    const response = await axios({
      method: 'post',
      url: baseUrl,
      params: searchQuery
    })

    return response.data
  } catch (error) {
    console.log('Error on attempt to get posts by search: ' + error)
  }
}

export default { getPostsBySearch }
