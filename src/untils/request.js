import axios from 'axios'

const Api =
  axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: process.env.VUE_APP_TIMEOUT||3000,
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json'
    },
  })

 Api.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function(err) {
      console.log('err', err)
      return Promise.reject(err)
    }
  )

  // Api.interceptors.response.use(
  //   function(response) {
  //       if(response.status===401){
  //           console.log("response:",response)
  //           window.location.href = '/home';
  //       }
  //       return response;
  //   },
  //   function(err){
  //       console.log("err:",err)
  //       window.location.href = '/home';
  //       return Promise.reject(err);
  //   }
  // )


export default Api