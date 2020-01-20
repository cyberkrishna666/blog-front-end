let token = null

const getToken = () => {
  token = `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}`

  return token
}

export default { getToken }