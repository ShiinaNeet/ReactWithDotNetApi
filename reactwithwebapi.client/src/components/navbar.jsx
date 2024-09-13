
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, [isAuthenticated])
   
    const loguserout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('expiryToken')
        window.location.reload();
    }
  return (
      <nav className="mx-auto bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full">
              <div className="flex-shrink-0 text-2xl font-bold py-5 px-1 w-full rounded">
                Retailer
            </div>
              <div className="flex flex-col text-white items-start h-16 text-white w-full text-sm">
                  <Link className='p-3 w-full rounded hover:bg-blue-500 hidden sm:block ' to="/products">Products</Link>
                  {!isAuthenticated && < Link className='p-3 w-full rounded hover:bg-blue-500 hidden sm:block' to="/Login">Login</Link>}
                  {isAuthenticated && < button className='p-3 w-full rounded hover:bg-blue-500 hidden sm:block' onClick={loguserout} >Logout</button>}

            </div>
        </div>
      </nav>
  );
}

export default Navbar;