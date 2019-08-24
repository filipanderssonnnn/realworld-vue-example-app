import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/v2`,
  headers: {
    'X-Api-Key': process.env.VUE_APP_API_KEY
  }
})

class BaseService {
  static get axios() {
    return instance
  }
}

export default BaseService
