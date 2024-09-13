import axios from 'axios';


window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:5127';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
//window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

const setupAxiosInterceptors = (authTokens) => {
    window.axios.interceptors.request.use(
        async (config) => {
            const expiryToken = localStorage.getItem('expiryToken');
       
            console.log('Date Time:', Date.now())
            const tokenExpiry = parseInt(expiryToken, 10);
            ;
         
            if (Date.now() >= tokenExpiry) {
                console.log('Token Expired')
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    await axios.post('/refresh', refreshToken).then(response => {
                        const { accessToken, newRefreshToken } = response.data;
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', newRefreshToken);

                        var datenow = new Date();
                        datenow.setMinutes(datenow.getMinutes() + 60);
                        const expiredDate = datenow.getTime();
                        localStorage.setItem('expiryToken', expiredDate.toString());
                    }).catch(error => {
                        console.error('Axios Error Interceptor:', error)
                    });
                    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                } catch (error) {
                    console.error('Error refreshing token', error);
                    return Promise.reject(error);
                }
            } 
            if (authTokens?.accessToken) {
                config.headers.Authorization = `Bearer ${authTokens.accessToken}`;
            }
            return config;
        }
       
    );
};
export { setupAxiosInterceptors };
