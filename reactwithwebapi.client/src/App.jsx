
import router  from './router';
import { RouterProvider } from "react-router-dom";
import './index.css'
function App() {

 

    //useEffect(() => {
    //    axios({
    //        method: 'GET',
    //        type: 'JSON',
    //        accept: 'application/json',
    //        url: '/api/users'
    //    })
    //    .then(response => {
    //        console.log('Data: '+ response.data.message);
    //    })
    //    .catch(function (error) {
    //        console.log(error);
    //    })
           
    //}, []);

   

    return <RouterProvider router={router} />;

}



export default App;