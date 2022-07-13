// import Cookies from 'js-cookie'
function setup(instance) {
    instance.interceptors.request.use(
      function(config) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      function(err) {
        return Promise.reject(err)
      }
    )
  }

  
  export default {
    setup,
    // checkToken
  }