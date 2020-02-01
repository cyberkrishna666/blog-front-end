import axios from 'axios'
const baseUrl = '/search'

export const searchService = () => {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  return {
    cancelRequest: (msg) => {
      source.cancel(msg)
    },
    getPostsBySearch: async (searchQuery) => {
      let response
      try {
        response = await axios({
        method: 'post',
        url: baseUrl,
        params: searchQuery,
        cancelToken: source.token
      })
      return response.data
    } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error.message)
        }
        console.log(error)
        return response.data
     }
   }
  }


}
