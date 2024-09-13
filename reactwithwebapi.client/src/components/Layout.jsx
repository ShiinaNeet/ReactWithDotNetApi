import Navbar from './navbar';
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from 'react-router-dom';
import { setupAxiosInterceptors } from '../axiosbootstrap';
import { useAuth } from '../AuthProvider';
function Layout() {
    const { authTokens, } = useAuth();
    useEffect(() => {
        if (authTokens) {
            setupAxiosInterceptors(authTokens);
        }
    }, [authTokens]);
    return (
       
         <div className="ee flex">
          <div className="flex w-fit">
           <Navbar />
          </div>
          <div className="w-full p-5">
            <div className="bg-slate-720 shadow-lg h-screen pt-5">
               <Outlet />
            </div>
            </div>
            <Toaster duration={1000} />

        </div>

    );
}

export default Layout;
